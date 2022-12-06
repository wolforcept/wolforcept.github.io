
// ▄▀  █ █ █ 
// ▀▄█ ▀▄█ █ 

function displayDisplayedTime(datetime) {

    let seconds = datetime.getSeconds();
    let minutes = datetime.getMinutes();
    let hours = datetime.getHours() - 1;

    if (minutes == 0 && hours == 0) {
        $('.game .top .text').html(seconds)
        return
    }

    if (hours == 0) {
        $('.game .top .text').html(minutes + " : " + seconds)
        return
    }

    $('.game .top .text').html(hours + " : " + minutes + " : " + seconds)
}

function displayTitle(title, flavorText) {
    $('.title').html(title)
    $('.flavor-text').html(flavorText)
}

function displayObjectives(objectives, doneObjectives) {

    const parent = $('.objectives')
    parent.empty()
    for (let i = 0; i < objectives.length; i++) {
        const objective = objectives[i];
        const elem = $(html`
            <div id="objective${i}" class="objective ${objective.type}">
                <span class="number">${objective.nr}</span>
                <div class="img"></div>
            </div>
        `)
        elem.click(() => objectiveClicked(i))

        if (doneObjectives.includes(i))
            elem.addClass('hidden')

        parent.append(elem)
    }
}

function displayHideObjective(i) {
}

function displayWalking(nr, percent) {

    if (percent > 0 && percent < 1) {
        $('.loading .inner').css('width', (100 * percent) + "%")
        $('.loading').addClass('walking')
    } else {
        $('.loading .inner').css('width', "100%")
        $('.loading').removeClass('walking')
    }
    $('.loading .text .nr').html(nr)
}

function displayMap(position, _zoom, missions, current) {

    $('.bottom .text').html((1 + current) + ' / ' + missions.length)

    const zoom = _zoom / 100;
    const map = $('.map .img img')
    map.width(`${100 * zoom}vw`);
    map.css('transform', `translate(-${position.x / 100 * zoom}vw, -${position.y / 100 * zoom}vw)`)

    const pins = $('.map .pins')
    let lastPin = undefined;
    missions.forEach((mission, i) => {

        const x = parseInt(mission.position.x / 100 * zoom - position.x / 100 * zoom);
        const y = parseInt(mission.position.y / 100 * zoom - position.y / 100 * zoom);

        const newPin = (current < i)
            ? $(html`<div class="pin not-done"></div>`)
            : (current > i)
                ? $(html`<div class="pin done"></div>`)
                : $(html`<div class="pin current"></div>`)
        newPin.css('left', `${x}vw`)
        newPin.css('top', `${y}vw`)

        if (lastPin) {
            const line = $(html`
            <svg width="100vw" height="100vw">
                <line x1="${x}vw" y1="${y}vw" x2="${lastPin.x}vw" y2="${lastPin.y}vw" style="stroke:#FFFFFF77;stroke-width:10" />
            </svg>`)
            pins.append(line)
        }

        lastPin = { x, y }

        pins.append(newPin)
    });

}

function displayEvent(data, completeFunc) {

}

function displayMenu() {
    transition('.game', '.menu')
}

// ▄▀  ▄▀▄ █▄ ▄█ ██▀ 
// ▀▄█ █▀█ █ ▀ █ █▄▄ 

var GAME;
const MAX_WALKING = 50;

function game(campaign) {
    const timeStarted = performance.now();

    var currentEvent = null;
    var missionsComplete = 0;
    var movementLeft, walking;
    var doneObjectives

    function getCurrentMission() {
        return campaign.missions[missionsComplete]
    }

    setTimer((i) => {
        const currTime = performance.now();
        displayDisplayedTime(new Date(parseInt(currTime - timeStarted)))
    }, 1000, () => true)

    function loadNextMission() {
        if (campaign.missions.length == missionsComplete) {
            displayMenu()
            return
        }
        let currentMission = getCurrentMission()
        movementLeft = currentMission.movement
        walking = 0
        doneObjectives = []
        displayTitle(currentMission.title, currentMission.flavorText)
        displayObjectives(currentMission.objectives, doneObjectives)
        displayWalking(movementLeft, walking)
        displayMap(campaign.position, campaign.zoom, campaign.missions, missionsComplete)
    }

    this.startWalk = () => {

        if (movementLeft <= 0 || walking > 0) {
            return;
        }

        walking = MAX_WALKING
        setTimer((i) => {
            walking--;

            if (walking == 0) {
                movementLeft--;
            }

            displayWalking(movementLeft, walking / MAX_WALKING)

        }, 100, () => walking > 0)
    }

    this.objectiveClicked = (i) => {
        if (movementLeft > 0)
            return;
        if (!doneObjectives.includes(i))
            doneObjectives.push(i)

        const objectives = getCurrentMission().objectives;
        displayObjectives(objectives, doneObjectives)

        if (doneObjectives.length == objectives.length) {
            missionsComplete++
            transition('.game', '.game', loadNextMission)
        }
    }

    loadNextMission();
    GAME = this;
}

// █ █▄ █ █▀▄ █ █ ▀█▀ ▄▀▀ 
// █ █ ▀█ █▀  ▀▄█  █  ▄█▀ 

function movementClicked() {
    if (GAME)
        GAME.startWalk();
}

function objectiveClicked(i) {
    if (GAME)
        GAME.objectiveClicked(i);
}