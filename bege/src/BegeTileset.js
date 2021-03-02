class BegeTileset {

    imageSrc;
    tiles;

    constructor(imageSrc) {
        this.imageSrc = imageSrc;
        this.tiles = {};
    }

    addTiles(name, x, y, width, height, cols, rows) {
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                let id = c + (r * cols);
                this.tiles[name + id] = { x: x + c * width, y: y + r * height, width, height };
            }
        }
    }

    drawTile(id, x = 0, y = 0, width = null, height = null) {
        // this.drawSet([{ id, x, y, width, height }], x, y);
        // }

        // drawSet(tileset, x = 0, y = 0) {

        let img = BEGE.assets[this.imageSrc];

        if (!img)
            console.log(`BEGE-ERROR: image <${imageSrc}> not present! Load it with BEGE.loadAsset("image_name.png")`);

        let tileSrc = this.tiles[id];

        image(img, x, y,
            width ? width : tileSrc.width,
            height ? height : tileSrc.height,
            tileSrc.x, tileSrc.y, tileSrc.width, tileSrc.height
        );

        // for (let i = 0; i < tileset.length; i++) {
        //     let tile = tileset[i];
        //     let tileSrc = this.tiles[tile.id];
        //     if (!tileSrc)
        //         console.log(`BEGE-ERROR: tile <${tile.id}> not present in tileset!`);
        //     image(img, x + (tile.x ? tile.x : 0), y + (tile.y ? tile.y : 0),
        //         tile.width ? tile.width : tileSrc.width, tile.height ? tile.height : tileSrc.height,
        //         tileSrc.x, tileSrc.y, tileSrc.width, tileSrc.height
        //     );
        // }

    }
}