let linkHtml = `<a style='position: fixed; bottom: 12px; right: 12px; cursor: pointer; z-index: 110;' href='https://www.patreon.com/wolforce' target="_blank"><img src='https://wolforcept.github.io/images/patreon128.png' width='32px'></a>`
let linkBackHtml = `<img style='position: fixed; bottom: 12px; right: 12px; z-index: 100; filter: blur(17px); opacity: 75%; transform: translate(4px, 4px);' src='https://wolforcept.github.io/images/patreon128.png' width='32px'></img>`
let body = $('body')
let linkBack = $(linkBackHtml)
let link = $(linkHtml)
body.append(link)
body.append(linkBack)
console.log("[page] patreon added")

function createElement() { }