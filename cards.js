function addCards(cards) {
    let content = $('<div id="content"></div>')
    cards.forEach(card => {
        let div
        if (card.separator)
            div = $(`<div class="separator">${card.title}</h3>`)
        else
            div = $(`
                    <a href="${card.url}" target="_blank">
                        <div class="card${card.pixelated ? ' pixelated' : ''}">
                            <img src="${card.image}">
                            <div class="cardGradient"></div>
                            <span class="title">${card.name}</span>
                        </div>
                    </a>`)
        content.append(div)
    });

    $('body').append(content)
}

