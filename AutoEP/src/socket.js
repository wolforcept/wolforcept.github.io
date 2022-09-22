var socket;
var disconnectReason;

function connect(address, username, password) {

    try {
        disconnectReason = "Failed to connect!";
        if (!address.includes(":"))
            address += ":443";
        let serveraddress = "ws://" + address + "/" + username;
        socket = new WebSocket(serveraddress);
    } catch (ex) {
        onDisconnect();
    }

    // console.log(socket);

    socket.onopen = function (event) {
        onConnected();
    };

    socket.onclose = function (event) {
        disconnectReason = "Server went down!";
        onDisconnect();
    };

    socket.onmessage = function (event) {
        let message = JSON.parse(event.data);

        switch (message.type) {
            case "gamestate": {
                gamestate = JSON.parse(message.payload).split("%%%").map(x => JSON.parse(x))
                break;
            }
            case "type_edit": {
                console.log(message);
                startEditing(JSON.parse(message.payload));
                break;
            }
            case "chat": {
                console.log(JSON.parse(message.payload));
                chatbox.chatMessageReceived(JSON.parse(message.payload));
                break;
            }
            case "assets": {
                loadAssets(JSON.parse(message.payload));
                break;
            }
            default: {
                console.log({ unknownMessage: message });
            }
        }
    };

}

function sendMessage(type, message) {
    console.log(message);
    socket.send(JSON.stringify({ "type": type, "payload": JSON.stringify(message) }));
}