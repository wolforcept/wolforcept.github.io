const nav = $("#setNav");
const navButton = $("#setNavCloseButton");
const content = $("#content");
const subnav = $("#subnav");

Object.keys(imageSets).forEach(setId => {
    const set = imageSets[setId];
    if (set.enabled) {
        const setLink = $(`<div id="${setId}" class="setLink">${set.name}</div>`);
        setLink.on("click", () => {
            // content.empty();
            subnav.empty();
            set.images.forEach((imgPath, i) => {
                let img, imgBig;
                if (imgPath.endsWith("gif")) {
                    img = $(`<div class="gif-icon">GIF ${i + 1}</div>`);
                    // img = $(`<img src="images/${setId}/${imgPath}">`);
                    imgBig = $(`<img data-gifffer="images/${setId}/${imgPath}">`);
                } else {
                    img = $(`<img src="images/${setId}/${imgPath}">`);
                    imgBig = $(`<img src="images/${setId}/${imgPath}">`);
                }
                img.on("click", () => {
                    // run();
                    content.empty();
                    content.append(imgBig);
                    Gifffer();
                    // createPanZoom(imgBig);
                });
                if (i === 0) {
                    content.empty();
                    content.append(imgBig);
                }
                subnav.append(img);
                Gifffer();
            })
        })
        nav.append(setLink);
    }
});

navButton.on("click", () => {
    if (nav.hasClass("hidden")) {
        nav.removeClass("hidden");
        navButton.html(svgLeft)
    } else {
        nav.addClass("hidden");
        navButton.html(svgRight)
    }
});
navButton.html(svgLeft);

const scrollContainer = document.querySelector("#subnav");
scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

