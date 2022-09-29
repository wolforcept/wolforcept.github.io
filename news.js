function displayNews() {

    simpleNews("Hearth Well... 2?", "September 2022",
        `I have released a Beta Version of Hearth Well for 1.18<br>
        Hearth Well is a skyblock mod, not dissimilar from sky resources or xnihilo, but a lot more magical. The objective is also to get the vanilla resources, but through more magical means.<br>
        It's still incomplete but many things already work.<br>
        It's very very different from the original mod for 1.12<br>
        Ill continue to develop it, and I will experiment with some short release cycles, with a couple features.<br>
        Disclaimer: Everything in the mod right now is subject to change!
    `)

    simpleNews("New Website Launched!", "September 2022",
        `I'm happy to finally launch a new clean website for myself but also for the community, as this has been a severe absence for quite some time now.<br>
        It is meant to be a central, information hub and easy access point to all my projects and hopefully will make it easier to understand and track my projects' development.<br>
        It will slowly grow with information about current and future projects.
    `)

    // newModNews("player-tabs", "New mod: Player Tabs", "April 2022",
    //     `Adds simple and easy to use tabs that expand your inventory.<br>
    //     Customizable with text and item icons!<br>
    // `)

}

function simpleNews(title, date, content) {

    let container = $("#newsContainer")

    container.append($(html`
        <div class="newsPiece">
            <div class="title">
                <div class="titleText">${title}</div>
                <div class="titleDate">${date}</div>
            </div>
            <p>${content}</p>
        </div>
    `))
}

function newModNews(modid, title, date, content) {

    let container = $("#newsContainer")

    container.append($(html`
        <div class="newsPiece">
            <div class="title">
                <div class="titleText">${title}</div>
                <div class="titleDate">${date}</div>
            </div>
            <p>${content}</p>
            <div class="modInfo">
                <!-- <a href="https://www.curseforge.com/minecraft/mc-mods/${modid}">Wiki</a> | -->
                <a href="https://www.curseforge.com/minecraft/mc-mods/${modid}">Curseforge</a><br>
            </div>
        </div>
    `))
}
$(document).ready(displayNews)
