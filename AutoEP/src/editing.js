$(document).bind('keydown', function (e) {
    if (e.ctrlKey && (e.which == 83)) {
        e.preventDefault();
        editingSave();
        return false;
    }
});

var editor;
var JavaScriptMode;

var editingType = undefined;
var saved = true;

function initEditor() {

    editor = ace.edit("editor");
    JavaScriptMode = ace.require("ace/mode/groovy").Mode;
    editor.session.setMode(new JavaScriptMode());
    editor.setTheme("ace/theme/nord_dark");
    editor.setOptions({
        "maxLines": Infinity,
        "wrapBehavioursEnabled": true
    });
    // editor.setAutoScrollEditorIntoView(true);

    editor.getSession().on('change', function () {
        saved = false;
    });

    makeDraggable("editing_top", "editing");
    makeDraggable("editing_corner", "editing", true);

    $("#editing").hide();
}

function closeEditor() {
    $("#editing").hide();
    $("#p5canvas").focus();
    editingType = undefined;
    saved = true;
}

var lastEditedType;
function startEditing(message) {

    let callback = function () {

        let type = message.type;
        if (type)
            lastEditedType = type
        else if (lastEditedType)
            type = lastEditedType;

        console.log(message)
        if (!type)
            return;
        editingType = type;
        editor.setValue(type.content, 1);
        editor.focus();
        $("#editor_title").html(type.name);
        $("#editing").show();
        saved = true;

        let typeList = message.types;
        reloadTypes(typeList, type.name);
    }

    if (!saved) {
        promptSave(() => { editingSave(); callback(); }, callback); return;
    } else {
        callback();
    }
}

function editingSave() {
    if (editingType) {
        editingType.content = editor.getValue();
        if (editingType.name)
            sendMessage("type", editingType);
        else
            sendMessage("global", editingType);
        saved = true;
        $("#editor_title").css("animation", "example 5s");
        setTimeout(function () { $("#editor_title").css("animation", "0"); }, 5000);
    }
}

function editing_edit(editingType) {
    return function () {
        startEditing(editingType);
    }
}

function editing_global(event_name) {
    return function () {
        sendMessage("chat", "/global " + event_name);
    }
}

// function enableEditingGlobals(enable) {
//     $("#globals_submenu_item").css("display", enable ? "block" : "none");
//     $("#events_submenu_item").css("display", enable ? "none" : "block");
// }

function editing_close() {
    if (!saved) {
        promptSave(() => { editingSave(); closeEditor(); }, closeEditor);
    } else
        closeEditor();
}

function findOrCreateMethod(name, argumentsString, modifiers) {
    var lines = editor.session.doc.getAllLines();
    var row = (function () {
        let regex = RegExp(`\\s*public${modifiers??""} void ${name}\\W`);
        for (var i = 0, l = lines.length; i < l; i++) {
            if (lines[i].match(regex))
                return i;
        }
        return undefined;
    })();
    console.log(`found ${name} in row ${row}`);

    if (row !== 0 && !row) {
        let alltext = editor.getValue();
        alltext += `

public${modifiers??""} void ${name} (${argumentsString ?? ""}) {

}`
        editor.setValue(alltext);
        editor.selection.moveTo(editor.session.getLength() - 2, Infinity)
        editor.gotoLine(editor.session.getLength() - 2);
    } else {
        // var column = editor.session.getLine(row).length;
        editor.gotoLine(row);
        editor.selection.moveTo(row, Infinity)
    }
}

//
//
//

var promptActionYes, promptActionNo;

function promptSave(saveFunction, dontSaveFunction) {
    promptActionYes = saveFunction;
    promptActionNo = dontSaveFunction;
    $("#prompt .message").html("Would you like to save?");
    $("#prompt #cancel").css("display", "inline-block");
    $("#prompt").show();
}

function editing_prompt_yes() {
    if (promptActionYes)
        promptActionYes();
    editing_prompt_cancel();
}

function editing_prompt_no() {
    if (promptActionNo)
        promptActionNo();
    editing_prompt_cancel();
}

function editing_prompt_cancel() {
    promptActionYes = undefined;
    promptActionNo = undefined;
    $("#prompt .message #cancel").hide();
    $("#prompt").hide();
}

//
//
//

var menus = [];

function createMenuItem(submenu, name, action) {
    // ✓

    menus.push({ "name": name, "action": action, "shortcut": false });

    $("#" + submenu).append(
        $(`<div class="sub_menu_item"
            oncontextmenu="
                toggleShortcut('` + name + `');
                return false;
            "
            onclick="performAction('`+ name + `');"
            >` + name + `
        </div>`)
    );

}

function toggleShortcut(name) {
    menus.forEach(menu => {
        if (menu.name == name) {
            menu.shortcut = !menu.shortcut;
        }
    });
    reloadShortcuts();
}

function performAction(name) {
    menus.forEach(menu => {
        if (menu.name == name) {
            menu.action();
        }
    });
}

function reloadShortcuts() {
    let editor_shortcuts = $("#editor_shortcuts");
    editor_shortcuts.empty();

    menus.slice().reverse().forEach(menu => {
        if (menu.shortcut)
            editor_shortcuts.append(
                $(`<div class="button"
                oncontextmenu="
                    toggleShortcut('` + menu.name + `');
                    return false;
                "
                onclick="performAction('`+ menu.name + `');"
                >` + menu.name + `
            </div>`)
            );
    });
    // editor_shortcuts.append($(`<div class="button" onclick="performAction('editing_minimize');" style="padding: 2px 7px 2px 7px;">_</div>`));
    editor_shortcuts.append($(`<div class="button" onclick="performAction('Close');" style="padding: 2px 7px 2px 8px;">x</div>`));
}


function reloadTypes(typeList, selectedType) {
    let list = $("#type_list");
    list.empty();
    let listTitle = $(`<div class='typeListTitle' style='font-size: 10px;'>- TYPES -</div>`);
    list.append(listTitle);
    if (typeList)
        typeList.forEach(typeName => {
            let classes = typeName == selectedType ? "list_type selected" : "list_type";
            let listItem = $(`<div class='${classes}' onclick='sendMessage("chat", "/edit ${typeName}");'>${typeName}</div>`);
            list.append(listItem);
        });
}

function makeDraggable(clickableElementId, moveableElementId, resize) {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let clickable = document.getElementById(clickableElementId);
    let moveable = document.getElementById(moveableElementId);

    clickable.onmousedown = function (e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    let elementDrag = function (e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // console.log(pos1 + "," + pos2 + "," + pos3 + "," + pos4)
        // set the element's new position:
        if (resize) {
            if (pos3 - moveable.offsetLeft > 500)
                moveable.style.width = (pos3 - moveable.offsetLeft) + "px";
            if (pos4 - moveable.offsetTop > 300)
                moveable.style.height = (pos4 - moveable.offsetTop) + "px";
        } else {
            moveable.style.top = (moveable.offsetTop - pos2) + "px";
            moveable.style.left = (moveable.offsetLeft - pos1) + "px";
        }
    }

    let closeDragElement = function () {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

function openSidebar() {
    $("#sidebar").show();
}

function closeSidebar() {
    $("#sidebar").hide();
}