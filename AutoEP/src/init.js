var autoconnect;

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


});

function login() {

    let address = $("#server_address")[0].value;
    let username = $("#username")[0].value;
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
}
function resetTextFailed() {
    isToReset = -1;
    $("#login_text_failed").html("");
    $("#login_text_failed").css("cursor", "pointer");
}

function onConnected() {

    // sendMessage("chat", "/g");

    new p5(p5instance, 'p5container');

    createMenuItem("file_submenu", "Save", editing_save);
    createMenuItem("file_submenu", "Close", editing_close);

    createMenuItem("globals_submenu", "player_create", editing_global("player_create"));

    createMenuItem("events_submenu", ":create", editing_edit("create"));
    createMenuItem("events_submenu", ":step", editing_edit("step"));

    toggleShortcut("Save");
    toggleShortcut("Base");

    reloadShortcuts();

    initEditor();

    $("#login_screen").hide();
    $("#game_screen").show();

    sendMessage("chat", "/type edit Base");

}
