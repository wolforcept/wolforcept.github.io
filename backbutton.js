window.addEventListener("load", function (event) {
    let linkHtml = `<a style='position: fixed; bottom: 12px; left: 12px; cursor: pointer; z-index: 110;' href='https://wolforcept.github.io/' target="_blank"><img src='https://wolforcept.github.io/images/icon2.png' width='32px'></a>`
    let linkBackHtml = `<img style='position: fixed; bottom: 12px; left: 12px; z-index: 100; filter: blur(17px); opacity: 75%; transform: translate(4px, 4px);' src='https://wolforcept.github.io/images/icon2.png' width='32px'></img>`
    let body = $('body')
    let linkBack = $(linkBackHtml)
    let link = $(linkHtml)
    body.append(link)
    body.append(linkBack)
    console.log("back button added")
}, false);
