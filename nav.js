function createElement() {

    const navLinks = [
        { title: 'Minecraft Mods', url: '#minecraftmods', },
        { title: 'Web Games', url: '#webgames', },
        { title: 'Software', url: '#software', },
        { title: 'Links', url: '#links', },
        { title: 'Other', url: '#other', },
        { title: 'About', url: '#about', },
    ]

    function createLink(link) {
        return html`<div class='link' onclick='window.location.href = \"${link.url}\"'>${link.title}</div>`
    }

    return html`
    <div class="nav-image">
        <a href="#about">
            <img src="./images/icon128.png">
        </a>
    </div>
    <div class="nav-title">WolforcePT</div>
    ${navLinks.map(link => createLink(link)).join('')}
    `
}