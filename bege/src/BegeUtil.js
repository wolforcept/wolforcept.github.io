function isPointInsideObject(x, y, obj) {
    if (!obj.sprite)
        return false;
    if (x >= obj.x && y >= obj.y && x < obj.x + obj.sprite.width && y < obj.y + obj.sprite.height) {

        if (obj.sprite.imageSrc === null)
            return true;

        let img = BEGE.assets[obj.sprite.imageSrc];
        let sprite = obj.sprite;
        let bounds = sprite.srcBounds;

        if (!obj.sprite.BEGEpixelsAreLoaded) {
            obj.sprite.pixels = img.loadPixels();
            obj.sprite.BEGEpixelsAreLoaded = true;
        }


        let rw = bounds.width / sprite.width;
        let rh = bounds.height / sprite.height;
        let index = 4 * (img.width * (bounds.y + Math.floor((y - obj.y) * rh)) + (bounds.x + Math.floor((x - obj.x) * rw)));
        return img.pixels[index + 3] > BEGE.alphaThreshold;
    }
    return false;
}