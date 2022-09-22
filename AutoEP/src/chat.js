
var sentMessages = [];
var sentMessagesIndex = -1;
var chatTimer = undefined;

chatUnfocus();

function chatFocus() {
    $("#textbox_wrapper").fadeIn()
    $("#textbox_input").focus()
}

function chatUnfocus() {
    $("#textbox_input").blur()
    chatFadeoutAfterSecs()
}

function chatIsFocused() {
    return $("#textbox_input").is(":focus")
}

function chatFadeoutAfterSecs() {
    $("#textbox_wrapper").fadeIn()
    if (chatTimer)
        clearTimeout(chatTimer)
    chatTimer = setTimeout(() => {
        if (!chatIsFocused())
            $("#textbox_wrapper").fadeOut("slow")
    }, 5000);
}

function chatMessageReceived(text) {
    $("#textbox_wrapper").fadeIn()
    let chat = $("#textbox_chat");
    chat.append("<br />" + text);
    var objDiv = document.getElementById("textbox_chat");
    objDiv.scrollTop = objDiv.scrollHeight;
    chatFadeoutAfterSecs()
}

function chatKeyPressed(key) {
    let input = $("#textbox_input")

    if (key.code == "Enter") {
        if (input.val()) {
            sendMessage("chat", input.val());
            sentMessages.push(input.val());
        }
        input.val("")
        chatUnfocus();
    }

    if (key.code == "ArrowUp") {
        if (sentMessages.length > 0) {
            sentMessagesIndex--;
            if (sentMessagesIndex == -1) {
                input.val("");
            }
            if (sentMessagesIndex < -1) {
                sentMessagesIndex = sentMessages.length - 1;
            }
            if (sentMessages[sentMessagesIndex])
                input.val(sentMessages[sentMessagesIndex]);
        }
        return;
    }
    if (key.code == "ArrowDown") {
        if (sentMessages.length > 0) {
            sentMessagesIndex++;
            if (sentMessages[sentMessagesIndex])
                input.val(sentMessages[sentMessagesIndex]);
            if (sentMessagesIndex >= sentMessages.length) {
                sentMessagesIndex = -1;
                input.val("");
            }
        }
        return false;
    }
}