class BegeSprite {

    imageSrc;
    width;
    height;
    srcBounds;
    imageSpeed = 30;
    BEGEpixelsAreLoaded = false;

    constructor(imageSrc, width, height, srcBounds) {
        this.imageSrc = imageSrc;
        this.width = width;
        this.height = height;
        this.srcBounds = srcBounds;
        if (!this.srcBounds)
            this.srcBounds = {};
        if (!this.srcBounds.x)
            this.srcBounds.x = 0;
        if (!this.srcBounds.y)
            this.srcBounds.y = 0;
        if (!this.srcBounds.width)
            this.srcBounds.width = width;
        if (!this.srcBounds.height)
            this.srcBounds.height = height;

    }

    BEGEdraw(x, y) {

        if (this.imageSrc === null)
            return;

        let image = BEGE.assets[this.imageSrc];

        if (!image)
            console.log(`ERROR: image <${imageSrc}> not present. Load it with BEGE.loadAsset("image_name.png")`);

        if (this.imageIndex) {
            // increase srcBounds.x
        } else {
            this.BEGEdrawImage(image, x, y);
        }

        if (this.draw) {
            this.draw(x, y);
        }
    }

    BEGEdrawImage(img, x, y) {
        // if (this.srcBounds) {
        image(img, x, y, this.width, this.height,
            this.srcBounds.x, this.srcBounds.y,
            this.srcBounds.width, this.srcBounds.height
        );
        // } else {
        //     image(img, x, y, this.width, this.height);
        // }
    }
}

