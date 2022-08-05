const navLinks = [
    { title: 'Minecraft Mods', url: './minecraftmods.html', },
    { title: 'Web Games', url: './webgames.html', },
    { title: 'Software', url: './software.html', },
    { title: 'Links', url: './links.html', },
    { title: 'Other', url: './other.html', },
    { title: 'About', url: './about.html', },
]

let nav = $(`
    <div id="nav">
        <div id="nav-image"><a href="https://wolforcept.github.io/"><img src="./images/icon128.png"></a></div>
        <div id="nav-title">WolforcePT</div>
    </div>
    `)

navLinks.forEach(link => {
    let div = $(`<div class="link">${link.title}</div>`)
    let _onClickLink = () => window.location.href = link.url;
    // window.location.replace(link.url);
    div.click(_onClickLink)
    link.click = _onClickLink
    nav.append(div)
});

$('body').append(nav)
