class BegeObject {

    x = 0;
    y = 0;
    z = 0;
    removed = false;
    mouseIsPressed = false;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    BEGEstep() {
        if (this.preStep)
            this.preStep();

        if (this.vx)
            this.x += this.vx;

        if (this.vy)
            this.y += this.vy;

        if (this.step)
            this.step.call(this);
    }

    BEGEdraw(event) {
        if (this.sprite)
            this.sprite.BEGEdraw(this.x, this.y, event)
        if (this.draw)
            this.draw(this.x, this.y, event);
    }

    remove() {
        this.removed = true;
    }
}

class BegeButton extends BegeObject {

    action;

    constructor(x, y, width, height, imageSrc, action) {
        super(x, y);
        this.action = action;
        this.sprite = new BegeSprite(imageSrc, width, height);
    }

    onMouseReleased() { this.action(); }
}