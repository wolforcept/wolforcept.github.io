
// setTimeout(() => {
// 	front.send("hello from front");
// }, 1000);

// front.on("hello from back", function (msg) {
// 	console.log(msg);
// 	$('#msg').html(msg);
// });

function html3(a) {
    console.log(a.join(''))
    return a.join('')
}

function html(strings, ...keys) {
    let ret = '';
    for (let i = 0; i < strings.length - 1; i++) {
        ret += strings[i];
        ret += keys[i];
    }
    ret += strings[strings.length - 1]
    return ret;
}

function html2(strings, ...keys) {
    let ret = '';
    for (let i = 0; i < strings.length - 1; i++) {
        ret += strings[i];
        ret += keys[i];
    }
    ret += strings[strings.length - 1]
    return $(ret);
}

function makeMenuItem(campaign) {
    const { title, requiredChampions, missions, shortDescription } = campaign;

    const isEnabled = missions && missions.length > 0

    let characterString = (requiredChampions.length > 2)
        ? requiredChampions.slice(0, 2).join(', ') + '...'
        : requiredChampions.join(', ')

    let item = $(html`
    <div class="item ${!isEnabled ? ' disabled' : ''}">
        <div class="name">${title}</div>
        <div class="info">
            <span><img src="../assets/svg/clock.svg"> ${missions?.length | 0}</span>
            <span><img src="../assets/svg/person.svg"> ${characterString}</span>
        </div>
    </div>
    `)

    $(".menu").append(item);

    if (isEnabled) {
        item.click(e => {
            $('.item.open').removeClass('open')
            item.addClass('open')
        })

        const innerInfo = $(html`
            <div class="inner-info">
            
                <div class="separator"></div>
            
                <div class="short-description">${shortDescription}</div>
            
            
                <div class="separator"></div>
            
                <span><img src="../assets/svg/clock.svg" style="height:3vw"> Missions: ${missions.length}</span>
                <div class="separator"></div>
            
                <!-- <div style="display: grid; column-gap: 2vw; row-gap: 0.5vw;"> -->
                <!-- <div style="grid-column: 1"> -->
                <span><img src="../assets/svg/person.svg" style="height:3vw"> Required Champions:</span>
                <div>
                    ${requiredChampions.map(c => html`
                    <img src="../assets/images/champions/icons/${c}.jpg" style="width: 5vw; transform: translateY(1vw)"> ${c}
                    `).join('<br />')}<br />
                </div>
                <div class="separator"></div>
            </div>
        `)
        item.append(innerInfo);

        const startButton = $(html`<div class="start-game-button">Start Game</div>`)
        startButton.click(_ => startGame(campaign))
        innerInfo.append(startButton);
    }
}

function makeMenu() {
    campaigns.forEach(c => makeMenuItem(c));
}

function startGame(campaign) {
    transition('.menu', '.game', () => { game({ ...campaign }) })
}