var socket;
var disconnectReason;

function connect(address, username, password) {

    try {
        disconnectReason = "Failed to connect!";
        if (!address.includes(":"))
            address += ":64047";
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
        let message = JSON.parse(event.data);
        if (message.type != "gamestate")
            console.log("Message received: " + message.type);

        switch (message.type) {
            case "gamestate": {
                gamestate = JSON.parse(message.payload);
                break;
            }
            case "type": {
                // console.log(message);
                startEditing(JSON.parse(message.payload));
                break;
            }
            case "chat": {
                console.log(message.payload);
                chatbox.chatMessageReceived(message.payload);
                break;
            }
            case "asset": {
                console.log(message.payload)
                loadAsset(message.payload, message.raw);
                break;
            }
        }
    };

}

function sendMessage(type, message) {
    console.log(message);
    socket.send(JSON.stringify({ "type": type, "payload": JSON.stringify(message) }));
}