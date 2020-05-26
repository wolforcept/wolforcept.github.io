class Obj {

    constructor(x, y, w, h) {
        this.x = x === undefined ? 0 : x;
        this.y = y === undefined ? 0 : y;
        this.w = w === undefined ? 64 : w;
        this.h = h === undefined ? 64 : h;
    }
}

var sentMessages = [];
var sentMessagesIndex = -1;
var gamestate = {};
var chatbox = {};

var p5instance = function (p) {
    p.setup = function () {

        let doc = $(document);
        p.createCanvas(doc.width() - 8, doc.height() - 8);

        chatbox = p.createInput("teste");
        chatbox.size(380, 30);
        chatbox.position(40, p.height - 50);
        chatbox.isVisible = false;
        chatbox.timer = 0;
        chatbox.maxTimer = 60 * 10;
        chatbox.chat = [];
        chatbox.chatMessageReceived = function (payload) {
            let words = payload.split(" ");
            let okwords = words.shift() + " " + words.shift();
            let len = p.textWidth(okwords);
            let first = false;
            while (words.length > 0) {
                if (first) {
                    first = false;
                    okwords += words.shift();
                } else { okwords += " " + words.shift(); }
                if (words.length > 0 && p.textWidth(okwords + " " + words[0]) > 380) {
                    this.chat.unshift(okwords);
                    okwords = "";
                    first = true;
                }
            }
            this.chat.unshift(okwords);
            chatbox.timer = chatbox.maxTimer;
        }
        $(chatbox.elt).hide();
    }

    p.draw = function () {
        let hitboxColor = p.color(255, 255, 255, 150);
        p.background(0, 0, 33);
        if (gamestate.objs) {
            gamestate.objs.forEach(obj => {
                // p.color(obj.color ? obj.color : p.color(255, 255, 255))

                p.stroke(hitboxColor);
                p.strokeWeight(01);
                p.noFill();
                p.rect(obj.x - obj.w / 2, obj.y - obj.h / 2, obj.w, obj.h)
            });
        }
        if (chatbox.isVisible || chatbox.timer > 0) {
            if (!chatbox.isVisible && chatbox.timer > 0)
                chatbox.timer--;
            let alphaMult = chatbox.isVisible ? 1 : Math.min(chatbox.timer, 120) / 240;
            let chatBackColor = p.color(0, 0, 22, 200 * alphaMult);
            let chatColor = p.color(255, 255, 255, 200 * alphaMult * 2);
            let chatY = p.height - 65;
            p.noStroke();
            p.fill(chatBackColor);
            p.rect(22, p.height - 20, 400, -220);
            let i = 0;
            p.fill(chatColor);
            p.textSize(16);
            p.textFont('Arial');
            chatbox.chat.slice(0, 6).forEach(element => {
                p.text(element, 35, chatY - 30 * i);
                i++;
            });
        }
    }

    p.keyReleased = function (key) {
        if (editingType)
            return;
        // console.log(key);
        if (key.code == "ArrowUp") {
            if (chatbox.isVisible && sentMessages.length > 0) {
                sentMessagesIndex--;
                if (sentMessagesIndex == -1) {
                    chatbox.elt.value = "";
                }
                if (sentMessagesIndex < -1) {
                    sentMessagesIndex = sentMessages.length - 1;
                }
                if (sentMessages[sentMessagesIndex])
                    chatbox.elt.value = sentMessages[sentMessagesIndex];
            }
        }
        if (key.code == "ArrowDown") {
            if (chatbox.isVisible && sentMessages.length > 0) {
                if (sentMessagesIndex >= 0) {
                    sentMessagesIndex++;
                    if (sentMessages[sentMessagesIndex])
                        chatbox.elt.value = sentMessages[sentMessagesIndex];
                    if (sentMessagesIndex >= sentMessages.length) {
                        sentMessagesIndex = -1;
                        chatbox.elt.value = "";
                    }
                }
            }
        }
        if (key.key == "/") {
            if (!chatbox.isVisible) {
                chatbox.elt.value = "/";
                let elt = $(chatbox.elt);
                elt.show();
                elt.focus();
                chatbox.isVisible = true;
            }
        }
        if (key.code == "Enter") {
            if (!chatbox.isVisible) {
                chatbox.elt.value = "";
                let elt = $(chatbox.elt);
                elt.show();
                elt.focus();
                chatbox.isVisible = true;
            } else {
                let chatMessage = chatbox.elt.value;
                if (chatMessage && chatMessage.length > 0) {
                    sentMessages.push(chatMessage);
                    sendMessage("chat", chatMessage);
                }
                sentMessagesIndex = -1;
                $(chatbox.elt).hide();
                chatbox.isVisible = false;
                chatbox.timer = chatbox.maxTimer;
            }
        }
        // uncomment to prevent any default behavior
        // return false;
    }

    p.mouseReleased = function () {
        if (editingType)
            return;
        sendMessage("input_mouseReleased", { "mx": p.mouseX, "my": p.mouseY });
    }

};
