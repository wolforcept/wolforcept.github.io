S = 64
S2 = S / 2;
locked = undefined;
equipas = [];
romanos = [];
perguntas = [];
perguntasImg = undefined;
mapW = 30;
mapH = 17;
belemX = 14;
belemY = 5;

function preload() {

    for (let x = 1; x < mapW - 1; x++) {
        perguntas[x] = [];
        for (let y = 1; y < mapH - 1; y++) {
            if (Math.random() < .9)
                perguntas[x][y] = { x: x * S, y: y * S };
        }
    }

    i = 0;
    [[1, 11], [3, 13], [5, 14], [7, 15], [24, 15], [26, 14], [27, 12], [28, 10]].forEach(e => {
        perguntas[e[0]][e[1]] = undefined;
        equipas[i] = { x: e[0] * S, y: e[1] * S }
        equipas[i].img = loadImage("equipa" + (i + 1) + ".png");
        i++;
    });

    [[7, 14], [11, 2], [11, 11], [10, 1], [26, 6], [27, 5], [24, 2], [28, 6], [22, 3], [5, 7], [4, 12],
    [21, 14], [12, 14], [15, 3], [17, 5], [12, 8], [13, 15], [13, 12], [17, 13], [10, 12], [12, 7],
    [27, 15], [11, 3], [27, 1], [15, 8], [15, 9], [25, 13], [14, 7], [14, 14], [27, 11], [22, 9], [20, 4],
    [25, 9], [8, 8], [17, 3], [2, 15], [2, 11], [22, 5], [26, 10], [23, 5], [4, 14], [9, 2], [21, 13],
    [19, 2], [21, 3], [23, 12], [8, 15], [28, 9], [25, 11], [26, 8], [8, 5], [3, 11], [15, 11], [6, 8],
    [14, 15], [2, 12], [9, 4], [12, 10], [6, 3], [28, 12], [6, 15], [13, 3], [5, 6], [23, 15], [7, 12],
    [20, 13], [26, 13], [8, 10], [10, 8], [17, 8], [17, 12], [26, 4], [23, 7], [15, 1], [20, 1],
    [24, 7], [27, 2]].forEach(e => {
        x = e[0];
        y = e[1];
        romanos.push({ x: x * S, y: y * S });
        if (perguntas[x][y] == undefined)
            perguntas[x][y] = { x: x * S, y: y * S };
    });

    if (perguntas[belemX][belemY] == undefined)
        perguntas[belemX][belemY] = { x: belemX * S, y: belemY * S };

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
    image(mapaImg, 0, 0, width, height)

    equipas.forEach(e => {
        image(e.img, e.x, e.y, S, S)
    });

    romanos.forEach(r => {
        image(romanosImg, r.x, r.y, S, S)
    });

    image(belemImg, belemX * S, belemY * S, S, S)

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
    let xx = parseInt(mouseX / S);
    let yy = parseInt(mouseY / S);
    //console.log(xx + "," + yy)

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