const S = 32, SB = 16;
let colorTrue, colorFalse;

// let xTrue = S * SB / 2 - S / 2, yTrue = S / 2, xFalse = xTrue, yFalse = S * SB - S;
// let dxTrue = 5, dyTrue = 4, dxFalse = -5, dyFalse = -4;

let xTrue = S / 2, yTrue = S / 2, xFalse = SB * S - S / 2, yFalse = SB * S - S / 2;
let dxTrue = 5, dyTrue = 4, dxFalse = -4, dyFalse = -5;

let board = [];

function setup() {
    createCanvas(S * SB, S * SB);
    colorTrue = color(90, 20, 0);
    colorFalse = color(0, 20, 90);

    noStroke();
    fill(colorTrue)

    // const vertical = Math.random() < .5;

    for (let x = 0; x < SB; x++) {
        board[x] = [];
        for (let y = 0; y < SB; y++) {
            // const isTrue = vertical ?  (x >= SB / 2): (y >= SB / 2);
            const isTrue = x >= SB / 2;
            board[x][y] = isTrue;
        }
    }

}

function draw() {

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            fill(board[x][y] ? colorTrue : colorFalse)
            rect(x * S, y * S, S, S);
        }
    }

    fill(colorTrue)
    rect(xTrue - S / 2, yTrue - S / 2, S, S);
    fill(255, 255, 255)
    rect(xTrue, yTrue, 1, 1);

    fill(colorFalse)
    rect(xFalse - S / 2, yFalse - S / 2, S, S);
    fill(0, 0, 0)
    rect(xFalse, yFalse, 1, 1);

    // TRUE MOVEMENT
    {
        if (xTrue + dxTrue < S / 2 || xTrue + dxTrue > S * SB - S / 2)
            dxTrue = -dxTrue;
        if (yTrue + dyTrue < S / 2 || yTrue + dyTrue > S * SB - S / 2)
            dyTrue = -dyTrue;

        const currX = Math.floor((xTrue) / S);
        const currY = Math.floor((yTrue) / S);
        const nextX = Math.floor((xTrue + dxTrue + (dxTrue > 0 ? S / 2 : -S / 2)) / S);
        const nextY = Math.floor((yTrue + dyTrue + (dyTrue > 0 ? S / 2 : -S / 2)) / S);
        if (nextX >= 0 && nextX < SB && board[nextX][currY]) {
            board[nextX][currY] = false;
            dxTrue = -dxTrue;
        }

        if (nextY >= 0 && nextY < SB && board[currX][nextY]) {
            board[currX][nextY] = false;
            dyTrue = -dyTrue;
        }

        xTrue += dxTrue;
        yTrue += dyTrue;
    }

    // FALSE MOVEMENT
    {
        if (xFalse + dxFalse < S / 2 || xFalse + dxFalse > S * SB - S / 2)
            dxFalse = -dxFalse;
        if (yFalse + dyFalse < S / 2 || yFalse + dyFalse > S * SB - S / 2)
            dyFalse = -dyFalse;

        const currX = Math.floor((xFalse) / S);
        const currY = Math.floor((yFalse) / S);
        const nextX = Math.floor((xFalse + dxFalse + (dxFalse > 0 ? S / 2 : -S / 2)) / S);
        const nextY = Math.floor((yFalse + dyFalse + (dyFalse > 0 ? S / 2 : -S / 2)) / S);
        if (nextX >= 0 && nextX < SB && !board[nextX][currY]) {
            board[nextX][currY] = true;
            dxFalse = -dxFalse;
        }

        if (nextY >= 0 && nextY < SB && !board[currX][nextY]) {
            board[currX][nextY] = true;
            dyFalse = -dyFalse;
        }

        xFalse += dxFalse;
        yFalse += dyFalse;
    }

}