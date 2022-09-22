var assets = {};

function loadAssets(assets) {
    Object.keys(assets).forEach(x => loadAsset(x, assets[x]))
}

function loadAsset(name, data) {

    p5realinstance.loadImage('data:image/png;base64,' + data, function (newImage) {
        assets[name] = newImage;
    });

}