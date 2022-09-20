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
var p5object;
var canvas;
var screenx, screeny;

var p5instance = function (p) {

    p.chatReceived = function (chat, originalText) {

        let words = originalText.split(" ");
        let okwords = words.shift() + " " + words.shift();
        let len = p.textWidth(okwords);
        let first = false;
        while (words.length > 0) {
            if (first) {
                first = false;
                okwords += words.shift();
            } else { okwords += " " + words.shift(); }
            if (words.length > 0 && p.textWidth(okwords + " " + words[0]) > 380) {
                chat.unshift(okwords);
                okwords = "";
                first = true;
            }
        }
        chat.unshift(okwords);
        chatbox.timer = chatbox.maxTimer;
    }

    p.setup = function () {
        p5object = p;
        let doc = $(document);
        canvas = p.createCanvas(doc.width(), doc.height());
        screenx = p.width / 2;
        screeny = p.height / 2;
        canvas.mousePressed(function () {
            // if (editingType)
            //     return;
            sendMessage("input_mouseReleased", { "mx": p.mouseX - screenx, "my": p.mouseY - screeny, "button": p.mouseButton });
            return true;
        })
        canvas.elt.oncontextmenu = function (e) {
            e.preventDefault();
            return false;
        }
        // $(canvas.elt).css("border", "solid 1px #FFFFFF44")

        chatbox = p.createInput("teste");
        chatbox.size(380, 30);
        chatbox.position(40, p.height - 50);
        chatbox.isVisible = false;
        chatbox.timer = 0;
        chatbox.maxTimer = 60 * 10;
        chatbox.chat = [];
        chatbox.chatMessageReceived = function (payload) {
            payload.split("\n").forEach(text => {
                if (text)
                    p.chatReceived(chatbox.chat, text);
            });

        }
        $(chatbox.elt).hide();
    }

    p.draw = function () {
        let hitboxColor = p.color(255, 255, 255, 150);
        p.background(0, 0, 33);
        if (gamestate && gamestate.forEach) {
            gamestate.forEach(obj => {
                // p.color(obj.color ? obj.color : p.color(255, 255, 255))
                let xx = screenx + obj.x - obj.w / 2;
                let yy = screeny + obj.y - obj.h / 2;
                if (obj.img && assets[obj.img]) {
                    p.image(assets[obj.img], xx, yy, obj.w, obj.h)
                } else {
                    p.stroke(hitboxColor);
                    p.strokeWeight(01);
                    p.noFill();
                    p.rect(xx, yy, obj.w, obj.h)
                }
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

    p.keyPressed = function (key) {
        if (editor.isFocused())
            return;
        // console.log(key);
        if (chatbox.isVisible) {
            if (key.code == "Enter") {
                let chatMessage = chatbox.elt.value;
                if (chatMessage && chatMessage.length > 0) {
                    sentMessages.push(chatMessage);
                    sendMessage("chat", chatMessage);
                }
                sentMessagesIndex = -1;
                $(chatbox.elt).hide();
                chatbox.isVisible = false;
                chatbox.timer = chatbox.maxTimer;
                return false;
            }
            if (key.code == "ArrowUp") {
                if (sentMessages.length > 0) {
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
                return false;
            }
            if (key.code == "ArrowDown") {
                if (sentMessages.length > 0) {
                    sentMessagesIndex++;
                    if (sentMessages[sentMessagesIndex])
                        chatbox.elt.value = sentMessages[sentMessagesIndex];
                    if (sentMessagesIndex >= sentMessages.length) {
                        sentMessagesIndex = -1;
                        chatbox.elt.value = "";
                    }
                }
                return false;
            }
            return true;
        }

        if (key.key == "/") {
            if (!chatbox.isVisible) {
                chatbox.elt.value = "";
                let elt = $(chatbox.elt);
                elt.show();
                elt.focus();
                chatbox.isVisible = true;
            }
            return;
        }
        if (key.code == "Enter") {
            chatbox.elt.value = "";
            let elt = $(chatbox.elt);
            elt.show();
            elt.focus();
            chatbox.isVisible = true;
            return;
        }
        sendMessage("input_keyPressed", key.code);
        return false;
    }

};
