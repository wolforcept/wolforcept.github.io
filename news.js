function displayNews() {

    news({
        title: "Hearth Well... 2?", date: "September 2022", content:
            `I have released a Beta Version of Hearth Well for 1.18<br>
    Hearth Well is a skyblock mod, not dissimilar from sky resources or xnihilo, but a lot more magical. The objective is also to get the vanilla resources, but through more magical means.<br>
    It's still incomplete but many things already work.<br>
    It's very very different from the original mod for 1.12<br>
    Ill continue to develop it, and I will experiment with some short release cycles, with a couple features.<br>
    Disclaimer: Everything in the mod right now is subject to change!
`},
        { src: "images/mods/hearthwell/logo1.png", maxHeight: 190, float: "right" },
        { modId: "hearth-well" }
    )


    news({
        title: "New Website Launched!", date: "September 2022", content:
            `I'm happy to finally launch a new clean website for myself but also for the community, as this has been a severe absence for quite some time now.<br>
        It is meant to be a central, information hub and easy access point to all my projects and hopefully will make it easier to understand and track my projects' development.<br>
        It will slowly grow with information about current and future projects.
    `})

    // newModNews("player-tabs", "New mod: Player Tabs", "April 2022",
    //     `Adds simple and easy to use tabs that expand your inventory.<br>
    //     Customizable with text and item icons!<br>
    // `)

}

function news({ title, date, content }, image, modInfo) {

    let container = $("#newsPage")

    let buildString = html`
        <div class="newsPiece">
            <div class="titleText">${title}</div>
            <div class="titleDate">${date}</div>
    `
    if (image)
        buildString += '<img src="' + image.src + '">';

    buildString += html`<p>${content}</p>`

    if (modInfo)
        buildString += html`<div class="modInfo"><a href="https://www.curseforge.com/minecraft/mc-mods/${modInfo.modid}">
        Download from Curseforge</a><br></div>`

    buildString += html`</div>`
    container.append($(buildString))
}

// function imageNews(title, date, content, imageSrc, imageMaxHeight, float = "right") {

//     let container = $("#newsContainer")

//     container.append($(html`
//         <div class="newsPiece">
//             <div class="title">
//                 <div class="titleText">${title}</div>
//                 <div class="titleDate">${date}</div>
//             </div>
//             <p>${content}</p>
//         </div>
//     `))
// }

// function simpleNews(title, date, content) {

//     let container = $("#newsContainer")

//     container.append($(html`
//         <div class="newsPiece">
//             <div class="title">
//                 <div class="titleText">${title}</div>
//                 <div class="titleDate">${date}</div>
//             </div>
//             <p>${content}</p>
//         </div>
//     `))
// }

// function newModNews(modid, title, date, content) {

//     let container = $("#newsContainer")

//     container.append($(html`
//         <div class="newsPiece">
//             <div class="title">
//                 <div class="titleText">${title}</div>
//                 <div class="titleDate">${date}</div>
//             </div>
//             <p>${content}</p>
//             
//         </div>
//     `))
// }

$(document).ready(displayNews)
