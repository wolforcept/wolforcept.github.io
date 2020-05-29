$(window).keypress(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    editing_save();
    event.preventDefault();
    return false;
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
    editor.setOption("wrapBehavioursEnabled", "true");

    editor.getSession().on('change', function () {
        saved = false;
    });

    $("#editing").hide();
}

function closeEditor() {
    $("#editing").hide();
    $("#p5canvas").focus();
    editingType = undefined;
}


function startEditing(type) {

    let callback = function () {
        enableEditingGlobals(false);
        console.log(type)
        if (!type)
            return;
        editingType = type;
        editor.setValue(type.content, 1);
        editor.focus();
        $("#editor_title").html(type.name);
        $("#editing").show();
        saved = true;
    }

    if (!saved) {
        promptSave(function () {
            editing_save(); callback();
        }, callback); return;
    } else {
        callback();
    }
}

function editing_save() {
    if (editingType) {
        editingType.content = editor.getValue();
        if (editingType.name)
            sendMessage("type", editingType);
        else
            sendMessage("global", editingType);
        saved = true;
    }
}

function editing_edit(event_name) {
    return function () {
        startEditing(editingType, event_name);
    }
}

function editing_global(event_name) {
    return function () {
        sendMessage("chat", "/global " + event_name);
    }
}
function enableEditingGlobals(enable) {
    $("#globals_submenu_item").css("display", enable ? "block" : "none");
    $("#events_submenu_item").css("display", enable ? "none" : "block");
}

function editing_close() {
    if (!saved) {
        promptSave(function () {
            editing_save(); closeEditor();
        }, close); return;
    }
    closeEditor();
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
