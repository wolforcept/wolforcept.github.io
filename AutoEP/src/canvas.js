class Obj {

    constructor(x, y, w, h) {
        this.x = x === undefined ? 0 : x;
        this.y = y === undefined ? 0 : y;
        this.w = w === undefined ? 64 : w;
        this.h = h === undefined ? 64 : h;
    }
}

var gamestate = {};
var p5object;
var canvas;
var screenx, screeny;

var p5instance = function (p) {

    p.setup = function () {
        p5object = p;
        let doc = $(document);
        canvas = p.createCanvas(doc.width(), doc.height());
        screenx = p.width / 2;
        screeny = p.height / 2;
        canvas.mousePressed(function () {
            // if (editingType)
            //     return;
            sendMessage("input_mousePressed", { "mx": p.mouseX - screenx, "my": p.mouseY - screeny, "button": p.mouseButton });
            return true;
        })
        canvas.mouseReleased(function () {
            sendMessage("input_mouseReleased", { "mx": p.mouseX - screenx, "my": p.mouseY - screeny, "button": p.mouseButton });
        })
        canvas.elt.oncontextmenu = function (e) {
            e.preventDefault();
            return false;
        }
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
                }
                else {
                    p.stroke(hitboxColor);
                    p.strokeWeight(1);
                    p.noFill();
                    p.rect(xx, yy, obj.w, obj.h)
                }
            });
        }
    }

    p.keyPressed = function (key) {

        if (editor.isFocused())
            return;

        if (chatIsFocused()) {
            chatKeyPressed(key);
            return;
        }

        // INPUT IS NOT FOCUSED
        if (key.code == "Enter" || key.key == "/") {
            chatFocus();
            return;
        }

        sendMessage("input_keyPressed", key.code);
        return false;
    }

    p.keyReleased = function (key) {

        if (editor.isFocused())
            return;

        sendMessage("input_keyReleased", key.code);
        return false;
    }

};
