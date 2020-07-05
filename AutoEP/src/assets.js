var assets = {};

function loadAsset(name, src) {
    var image = new Image();
    image.onload = function () {
        assets[name] = image;
    };
    image.src = `data:image/png;base64,` + src;
    // console.log(src);
    document.body.appendChild(image);
    // ctx.drawImage(image, 0, 0);
}