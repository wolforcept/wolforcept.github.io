var socket;
var disconnectReason;

function connect(address, username, password) {

    try {
        disconnectReason = "Failed to connect!";
        socket = new WebSocket("ws://" + address + "/" + username);
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
        try {
            let message = JSON.parse(event.data);
            let payload = JSON.parse(message.payload);
            if (message.type != "gamestate")
                console.log("Message received: " + message.type);
            if (message.type.startsWith("global:")) {
                let event = message.type;
                let globalType = {};
                globalType[event] = payload;
                startEditing(globalType, event, true);
            }
            switch (message.type) {
                case "gamestate": {
                    gamestate = payload;
                    // console.log(message);
                    break;
                }
                case "type": {
                    startEditing(payload);
                    break;
                }
                case "chat": {
                    console.log(payload);
                    chatbox.chatMessageReceived(payload);
                }
            }
        } catch{ }
    };

}

function sendMessage(type, message) {
    socket.send(JSON.stringify({ "type": type, "payload": JSON.stringify(message) }));
}