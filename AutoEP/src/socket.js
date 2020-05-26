var socket;

function connect(address, username, password) {

    try {
        socket = new WebSocket("ws://" + address + "/" + username);
    } catch {
        onFailedConnect();
    }

    // console.log(socket);

    socket.onopen = function (event) {
        onConnected();
    };

    socket.onclose = function (event) {
        onFailedConnect();
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