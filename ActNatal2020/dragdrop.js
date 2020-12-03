S = 144
S2 = S / 2;
locked = undefined;
equipas = [];
romanos = [];
perguntas = [];
perguntasImg = undefined;
mapW = 13;
mapH = 7;
belemX = 6 * S;
belemY = 2 * S;

function preload() {

    for (let i = 0; i < 8; i++) {
        equipas[i] = { x: i * S, y: 0 }
        equipas[i].img = loadImage("equipa" + (i + 1) + ".png");
    }

    [[1, 4], [3, 3], [4, 1], [4, 4], [4, 5], [6, 4], [9, 1], [10, 4]].forEach(e => {
        romanos.push({ x: e[0] * S, y: e[1] * S })
    });

    for (let x = 1; x < mapW - 1; x++) {
        perguntas[x] = [];
        for (let y = 1; y < mapH - 1; y++)
            perguntas[x][y] = { x: x * S, y: y * S }
    }

    perguntasImg = loadImage("pergunta.png");
    belemImg = loadImage("belem.png");
    mapaImg = loadImage("mapa.png");
    romanosImg = loadImage("romano.png");
}

function setup() {
    createCanvas(mapW * S, mapH * S);
    strokeWeight(2);
}

function draw() {
    background(100, 100, 200);
    image(mapaImg, 0, 0)

    equipas.forEach(e => {
        image(e.img, e.x, e.y, S, S)
    });

    romanos.forEach(r => {
        image(romanosImg, r.x, r.y, S, S)
    });

    image(belemImg, belemX, belemY, S, S)

    perguntas.forEach(array => {
        for (let i = 0; i < array.length; i++) {
            const p = array[i];
            if (p) {
                if (p.opacity) {
                    p.opacity *= .9;
                    if (p.opacity < 1) {
                        array[i] = undefined;
                    } else {
                        tint(255, 255, 255, p.opacity);
                        image(perguntasImg, p.x, p.y, S, S)
                        noTint();
                    }
                } else {
                    image(perguntasImg, p.x, p.y, S, S)
                }
            }
        }
    });

    stroke(0);
    fill(0, 0, 0);
    for (let i = 0; i < mapW; i++) {
        x = i * S;
        line(x - 1, 0, x - 1, height);
    } for (let i = 0; i < mapH; i++) {
        y = i * S;
        line(0, y - 1, width, y - 1);
    }
}

function mousePressed() {
    equipas.forEach(e => {
        if (!locked && mouseX > e.x && mouseX < e.x + S && mouseY > e.y && mouseY < e.y + S) {
            e.offsetX = mouseX - e.x;
            e.offsetY = mouseY - e.y;
            locked = e;
        }
    });
}

function mouseDragged() {
    if (locked) {
        locked.x = mouseX - locked.offsetX;
        locked.y = mouseY - locked.offsetY;
    }
}

function mouseReleased() {
    if (locked) {
        locked.x = parseInt(round(locked.x / S)) * S;
        locked.y = parseInt(round(locked.y / S)) * S;
        locked = undefined;
        return;
    }

    perguntas.forEach(arr => {
        arr.forEach(p => {
            if (p && !p.opacity && !locked && mouseX > p.x && mouseX < p.x + S && mouseY > p.y && mouseY < p.y + S) {
                p.opacity = 255
            }
        });
    });
}