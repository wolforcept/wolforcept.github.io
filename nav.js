function createElement() {

    const navLinks = [
        { title: 'News', url: '', },
        { title: 'Minecraft', url: '#minecraftmods', },
        { title: 'Games', url: '#webgames', },
        { title: 'Software', url: '#software', },
        { title: 'Links', url: '#links', },
        { title: 'Other', url: '#other', },
        // { title: 'About', url: '#about', },
    ]

    function createLink(link) {
        let classes = isActive(link) ? "link active" : "link"
        return html`<div class='${classes}' onclick='window.location.href = \"${link.url}\"'>${link.title}</div>`
    }

    function isActive(link) {
        let currHash = getCurrentHashLoc()
        if (link.url === '' && currHash === '')
            return true
        if (link.url === '')
            return false
        else
            return currHash && currHash.startsWith(link.url.substring(1))
    }

    return html`
    <div class="nav-image">
        <a href="">
            <img src="./images/icon128.png">
        </a>
    </div>
    <div class="nav-title">WolforcePT</div>
    ${navLinks.map(link => createLink(link)).join('')}
    `
}