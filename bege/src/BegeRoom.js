class BegeRoom {

    objects;
    mx = -10000;
    my = -10000;

    constructor() {
        this.objects = [];
    }

    BEGEstep() {
        if (this.step)
            this.step();

        this.objects.forEach(obj => {
            if (obj.onHover) {
                if (isPointInsideObject(this.mx, this.my, obj)) {
                    obj.isHovered = true;
                    if (typeof (obj.onHover) === 'function')
                        obj.onHover.call(obj, this.mx, this.my);
                } else { obj.isHovered = false; }
            }
            obj.BEGEstep();
        });
    }

    BEGEdraw(event) {

        if (this.predraw)
            this.predraw(event);

        this.objects.sort((a, b) => a.z - b.z);
        for (let i = this.objects.length - 1; i >= 0; i--)
            this.objects[i].BEGEdraw(event);

        if (this.draw)
            this.draw(event);
    }

    addObject(obj) {
        obj.room = this;
        this.objects.push(obj);
        return obj;
    }
}
