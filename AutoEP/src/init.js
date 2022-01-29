var autoconnect;
var address;
var username;
var p5realinstance;

$(document).ready(async function () {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // editing_close();

    $("#server_address")[0].value = getCookie("autoep.address") ?? "";
    $("#username")[0].value = getCookie("autoep.username") ?? "";
    $("#password")[0].value = getCookie("autoep.password") ?? "";
    autoconnect = getCookie("autoep.autoconnect") ?? "false";
    updateAutoConnect();
    if (autoconnect == "true")
        login();

    createMenuItem("file_submenu", "Save", editingSave);
    createMenuItem("file_submenu", "Close", editing_close);

    // events
    [
        "Create:create",
        "Step:step",
        "Collision:collision"
    ].forEach(element => {
        let args = element.split(":");
        createMenuItem("events_submenu", args[0], function () { findOrCreateMethod(args[1], args[2], args[3]); });
    });

    // static events
    [
        "Game Start:globalGameStarted:: static",
        "Player Joined:globalPlayerJoined: username : static",
        "Key Pressed:globalKeyPressed: username, keyCode : static",
        "Key Released:globalKeyReleased: username, keyCode : static",
        "Mouse Button Pressed:globalMousePressed: username, mx, my, button : static",
        "Mouse Button Released:globalMouseReleased: username, mx, my, button : static"
    ].forEach(element => {
        let args = element.split(":");
        createMenuItem("global_events_submenu", args[0], function () { findOrCreateMethod(args[1], args[2], args[3]); });
    });

    toggleShortcut("Save");

    reloadShortcuts();

    // closeSidebar();
});

function login() {

    address = $("#server_address")[0].value;
    username = $("#username")[0].value;
    let password = $("#password")[0].value;

    if (username && password) {
        console.log("connecting to " + address + " (" + username + "," + password + ")");
        $("#login_button").hide();
        $("#login_text").css("display", "inline-block");
        connect(address, username, password);
        setCookie("autoep.address", address)
        setCookie("autoep.username", username)
        setCookie("autoep.password", password)
        setCookie("autoep.autoconnect", autoconnect)
    }
}

function toggleAutoConnect() {
    autoconnect = autoconnect == "true" ? "false" : "true";
    updateAutoConnect();
}

function updateAutoConnect() {
    setCookie("autoep.autoconnect", autoconnect);
    $("#autoconnect").empty();
    $("#autoconnect").append($(autoconnect == "true"
        ? "<div>Connect Automatically <div style='display: inline-block; font-size: 30px; transform: translateY(4px);'>✓</div></div>" // ☐
        : "<div>Connect Automatically <div style='display: inline-block; font-size: 30px; transform: translateY(4px);'>✘</div></div>" // ☑
    ));
}

var isToReset = -1;
function onDisconnect() {
    // top part
    $("#login_text").hide();
    $("#login_button").css("display", "inline-block");
    // bottom part
    $("#login_text_failed").html(disconnectReason);
    $("#login_text_failed").css("display", "inline-block");
    $("#login_text_failed").css("cursor", "auto");
    let resetId = Math.random();
    isToReset = resetId;
    setTimeout(function () {
        if (isToReset == resetId)
            resetTextFailed();
    }, 10000);

    $("#login_screen").show();
    $("#game_screen").hide();
    if (p5object)
        p5object.remove();
}
function resetTextFailed() {
    isToReset = -1;
    $("#login_text_failed").html("");
    $("#login_text_failed").css("cursor", "pointer");
}

function onConnected() {

    p5realinstance = new p5(p5instance, 'p5container');

    reloadTypes();

    initEditor();

    $("#login_screen").hide();
    $("#game_screen").show();

    $("#infoline1").html("Connected to: " + address);
    $("#infoline2").html("Username: " + username);

    saved = true;

    // edit();
}

function edit() {
    sendMessage("chat", "/edit");
}

function restart() {
    sendMessage("chat", "/restart");
}
