var BEGE = {

    alphaThreshold: 1,

    assets: {},
    assetsToLoad: [],
    loadAsset: function (assetName, assetType = "image") {
        this.assetsToLoad.push({ assetName, assetType });
    },

    currentRoom: null
};

function preload() {
    if (BEGE.assetsToLoad.length > 0) {
        BEGE.assetsToLoad.forEach(({ assetName, assetType }) => {
            console.log("Loading asset: " + assetName);
            if (assetType == "image")
                BEGE.assets[assetName] = loadImage(`assets/${assetName}`);
            if (assetType == "font")
                BEGE.assets[assetName] = loadFont(`assets/${assetName}`);
        });
        BEGE.assetsToLoad = [];
    }
}

function setup() {
    let canvas = createCanvas(1024, 768);
    canvas.style("padding-left", 0)
    canvas.style("padding-right", 0)
    canvas.style("margin-left", "auto")
    canvas.style("margin-right", "auto")
    canvas.style("display", "block")

    if (gameStart)
        gameStart();
}

function draw() {


    let room = BEGE.currentRoom;
    if (!room) return;

    room.mx = mouseX;
    room.my = mouseY;

    var i = room.objects.length;
    while (i--) {
        let obj = room.objects[i];
        if (obj.removed) room.objects.splice(i, 1);
    }

    room.BEGEstep();

    // DRAWING

    noSmooth();

    if (room.backgroundColor)
        background(room.backgroundColor);
    room.BEGEdraw({ mx: room.mx, my: room.my });

}

//
// EVENTS

function mousePressed(event) {

    let room = BEGE.currentRoom;
    if (!room) return;

    let mx = mouseX;
    let my = mouseY;

    if (room.onMousePressed) {
        if (room.onMousePressed({ mx, my, ...event }))
            return;
    }

    room.objects.every(obj => {
        if (isPointInsideObject(mx, my, obj)) {
            obj.isMousePressed = true;
            if (obj.onMousePressed)
                if (obj.onMousePressed.call(obj, { mx, my, ...event })) //if it was handled
                    return false;
        }
        return true;
    });
}

function mouseReleased(event) {

    let room = BEGE.currentRoom;
    if (!room) return;

    let mx = mouseX;
    let my = mouseY;
    let handled = false;

    if (room.onMouseReleased) {
        handled = handled || room.onMouseReleased({ mx, my, ...event });
    }

    room.objects.forEach(obj => {
        if (obj.sprite && obj.onMouseReleased && obj.sprite.width && obj.sprite.height &&
            mx > obj.x && my > obj.y && mx < obj.x + obj.sprite.width && my < obj.y + obj.sprite.height) {
            if (!handled)
                handled = handled || obj.onMouseReleased.call(obj, { mx, my, ...event });
        }
        obj.isMousePressed = false;
    });
}

function ninePatch(assetName, x, y, width, height) {
    let img = BEGE.assets[assetName];
    if (!img)
        console.log(`ERROR: image <${imageSrc}> not present. Load it with BEGE.loadAsset("image_name.png")`);
    let patchWidth = img.width / 3;
    let patchHeight = img.height / 3;

    for (let dx = patchWidth; dx < width - patchWidth; dx += patchWidth) {
        for (let dy = patchHeight; dy < height - patchHeight; dy += patchHeight) {
            image(img, x + dx, y + dy, patchWidth, patchHeight,
                patchWidth, patchHeight, patchWidth, patchHeight
            );
        }
    }

    // HORIZONTALS
    [[0, 0], [height - patchHeight, patchHeight * 2]].forEach(([dy, srcDy]) => {
        let dx = patchWidth;
        for (; dx < width - patchWidth * 2; dx += patchWidth) {
            image(img, x + dx, y + dy, patchWidth, patchHeight,
                patchWidth, srcDy, patchWidth, patchHeight
            );
        }
        if (width > patchWidth * 2)
            image(img, x + width - patchWidth * 2, y + dy, patchWidth, patchHeight,
                patchWidth, srcDy, patchWidth, patchHeight
            );
    });

    // VERTICALS
    [[0, 0], [width - patchWidth, patchWidth * 2]].forEach(([dx, srcDx]) => {
        let dy = patchHeight;
        for (; dy < height - patchHeight * 2; dy += patchHeight) {
            image(img, x + dx, y + dy, patchWidth, patchHeight,
                srcDx, patchHeight, patchWidth, patchHeight
            );
        }
        if (height > patchHeight * 2)
            image(img, x + dx, y + height - patchHeight * 2, patchWidth, patchHeight,
                srcDx, patchHeight, patchWidth, patchHeight
            );
    });

    // draw corners
    image(img, x, y, patchWidth, patchHeight,
        0, 0, patchWidth, patchHeight
    );
    image(img, x + width - patchWidth, y, patchWidth, patchHeight,
        patchWidth * 2, 0, patchWidth, patchHeight
    );
    image(img, x, y + height - patchHeight, patchWidth, patchHeight,
        0, patchHeight * 2, patchWidth, patchHeight
    );
    image(img, x + width - patchWidth, y + height - patchHeight, patchWidth, patchHeight,
        patchWidth * 2, patchHeight * 2, patchWidth, patchHeight
    );

}