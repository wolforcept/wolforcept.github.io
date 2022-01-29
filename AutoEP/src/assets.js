var assets = {};

function loadAsset(name, src) {

    let img;
    let raw = new Image();
    raw.src = 'data:image/png;base64,' + src; // base64 data here
    raw.onload = function () {
        img = p5realinstance.createImage(raw.width, raw.height);
        img.drawingContext.drawImage(raw, 0, 0);
        assets[name] = img;
    }

    // var raw = new Image();
    // raw.src = `data:image/png;base64,` + src;
    // raw.onload = function () {
    //     console.log(p5realinstance);
    //     assets[name] = p5realinstance.createImage(raw.width, raw.height);
    //     console.log(assets[name]);
    // };

    // console.log(src);
    // document.body.appendChild(image);
    // ctx.drawImage(image, 0, 0);
}