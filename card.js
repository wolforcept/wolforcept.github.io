function createElement({ title, url, image, pixelated, separator }) {

    return html`
        <a href="${url}" ${url.startsWith('#') ? '' : `target="_blank" `}>
            <div ${pixelated ? 'class="pixelated"' : '' }>
                <img src="${image}">
                <div class="cardGradient"></div>
                <span class="title">${title}</span>
            </div>
        </a>
        `
}