function displayNews() {
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
