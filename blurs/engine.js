class NormalMode {

    game
    maxBlur = 100
    maxPoints = 3
    name = "NORMAL"

    constructor(game) {
        this.game = game
    }

    getBlur() {
        let _blur = this.maxBlur * this.game.currentPoints / this.maxPoints
        return _blur;
    }

    startRound() {
        this.game.currentPoints = 3
    }

    submit() {
        let name = this.game.currentName.replace(/\s/g, '').toLowerCase()
        let inputText = $('#input').val().replace(/\s/g, '').toLowerCase()

        if (name == 'rakan') name = 'xayah'
        if (inputText == 'rakan') inputText = 'xayah'

        if (inputText == name)
            this.game.win()
        else
            this.failedSubmit()
        updateScore(this.game)
    }

    failedSubmit() {
        this.game.currentPoints--
        setImage('image', null, this.getBlur(), 1)
        if (this.game.currentPoints == 0)
            this.game.lose()
    }
}

class TimedMode {

    game
    maxBlur = 120
    maxPoints = 1000
    timeBefore = 100
    timeInterval = 20
    name = "TIMED"
    timerFunc

    constructor(game) {
        this.game = game
    }

    getBlur() {
        let _blur = this.maxBlur * this.game.currentPoints / this.maxPoints
        return _blur;
    }

    initGameMode() {
    }

    startRound() {
        this.game.currentPoints = this.maxPoints
        this.startTimer()
    }

    submit() {
        let name = this.game.currentName.replace(/\s/g, '').toLowerCase()
        let inputText = $('#input').val().replace(/\s/g, '').toLowerCase()

        if (name == 'rakan') name = 'xayah'
        if (inputText == 'rakan') inputText = 'xayah'

        if (inputText == name)
            this.game.win()
        updateScore(this.game)
    }

    startTimer() {

        let timer = () => {
            this.game.currentPoints--
            setImage('image', null, this.getBlur())
            updateScore(this.game)
            if (this.game.currentPoints == 0)
                this.game.lose()
        }
        setTimeout(() => {
            this.timerFunc = setInterval(timer, this.timeInterval);
        }, this.timeBefore)
    }

    win() {
        clearInterval(this.timerFunc)
    }

    lose() {
        clearInterval(this.timerFunc)
    }
}

class BlurGame {

    gameModes = [new NormalMode(this), new TimedMode(this)]

    enterFunc
    allNames
    used

    gameMode
    totalPoints = 0
    totalPossiblePoints = 0
    currentPoints = 0
    currentName
    blurMultiplier

    hasEnded() { }
    async getImagePath() { }
    getRandomName() { }

    constructor({ title, description, getImagePath, getRandomName, hasEnded, nextRoundText, blurMultiplier, allNames }) {

        this.getImagePath = getImagePath
        this.getRandomName = getRandomName
        this.hasEnded = hasEnded
        this.blurMultiplier = blurMultiplier ? blurMultiplier : 1
        this.allNames = allNames

        this.gameMode = this.gameModes[0]

        this.enterFunc = this.gameStartClicked

        $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../style.css'));

        $('body').on('keypress', e => {
            if (selectedAutocomplete > 0) {
                selectedAutocomplete = 0
                $('#input').focus()
                return
            }

            if ((e.keyCode || e.which) == 13)
                this.enterFunc()
        })

        $('body').on('keyup', e => {
            setTimeout(() => {
                onkey(e)
            }, 1);
        })

        $('#content').load('../content.html', () => {
            this.getImagePath(this.getRandomName()).then(image => setImage('titleImage', image, 100))

            $('#title').html(title)
            $('#helpText').html(description)
            $('#game').hide()
            $('#gameEnd').hide()
            $('#finalScore').hide()

            if (nextRoundText)
                $('#nextRoundButton').html(nextRoundText.toUpperCase())
        })
    }

    initGame() {
        console.log('NEW GAME STARTED');
        $('#menu').hide()
        $('#game').show()
        $('#score').show()
        this.used = []
        this.currentPoints = 0
        this.totalPoints = 0
        this.totalPossiblePoints = 0
        if (this.gameMode.initGameMode)
            this.gameMode.initGameMode()
        this.startRound(this)
    }

    startRound() {
        this.currentName = this.getRandomName()
        while (this.used.includes(this.currentName))
            this.currentName = this.getRandomName()
        this.used.push(this.currentName)

        this.getImagePath(this.currentName).then(image => {
            console.log('START ROUND!');
            $('#nextRoundButton').hide()
            $('#inputSubmitBox').show()

            this.totalPossiblePoints += this.gameMode.maxPoints
            console.log(this.used);

            if (this.gameMode.startRound)
                this.gameMode.startRound()
            this.enterFunc = this.submitClicked

            setImage('image', image, this.gameMode.getBlur())
            updateScore(this)
        });
    }

    endRound() {
        console.log('END ROUND');
        $('#nextRoundButton').show()
        $('#inputSubmitBox').hide()
        updateScore(this)
        this.enterFunc = this.nextRoundClicked
        if (this.gameMode.endRound)
            this.gameMode.endRound()
    }

    win() {
        console.log('WIN');
        setImage('image', null, null, 1)
        this.totalPoints += this.currentPoints
        this.currentPoints = 0
        updateScore(this)
        this.endRound()
        if (this.gameMode.win)
            this.gameMode.win()
    }

    lose() {
        console.log('LOSE');
        this.endRound()
        updateScore(this)
        if (this.gameMode.lose)
            this.gameMode.lose()
    }

    gameEnded() {
        console.log('GAME ENDED')
        this.enterFunc = this.gameCompleteClicked
        $('#finalScore').html(`FINAL SCORE: ${this.totalPoints} / ${this.totalPossiblePoints}`)
        $('#menu').show()
        $('#game').hide()
        $('#menuButtons').hide()
        $('#helpText').hide()
        $('#gameEnd').show()
        $('#finalScore').show()
    }

    // █ █▄ █ █▀▄ █ █ ▀█▀ ▄▀▀ 
    // █ █ ▀█ █▀  ▀▄█  █  ▄█▀ 

    gameStartClicked() {
        console.log("GAME START")
        this.initGame()
        resetInput()
    }

    nextRoundClicked() {
        if (this.hasEnded(this.used))
            this.gameEnded()
        else {
            this.startRound()
        }
        resetInput()
    }

    submitClicked() {
        console.log("SUBMIT")
        this.gameMode.submit()
        resetInput()
    }

    changeGameModeClicked() {
        let newIndex = this.gameModes.findIndex(x => x == this.gameMode) + 1
        if (newIndex >= this.gameModes.length)
            newIndex = 0
        this.gameMode = this.gameModes[newIndex]

        this.setGameModeButton(this.gameMode.name)

        console.log("CHANGE GAME MODE: " + this.gameMode)
    }

    gameCompleteClicked() {
        this.enterFunc = this.gameStartClicked
        $('#finalScore').hide()
        $('#menu').show()
        $('#menuButtons').show()
        $('#helpText').show()
        $('#gameEnd').hide()
        $('#finalScore').hide()
    }



    // ▄▀▄ █ █ ▀█▀ █▀▄ █ █ ▀█▀ ▄▀▀ 
    // ▀▄▀ ▀▄█  █  █▀  ▀▄█  █  ▄█▀ 

    setGameModeButton(newText) {
        $('#gameModeButton').html('GAME MODE: ' + newText.toUpperCase())
    }

}

// ▄▀▄ ▀█▀ █▄█ ██▀ █▀▄ 
// ▀▄▀  █  █ █ █▄▄ █▀▄ 

function setImage(imageId, path, blur, blurTransition, opacity, opacityTransition) {
    let image = $('#' + imageId);

    let transitionString = '';
    if (blurTransition)
        transitionString += `filter ${blurTransition}s linear`
    if (blurTransition && opacityTransition)
        transitionString += ' , '
    if (opacityTransition)
        transitionString += `opacity ${opacityTransition}s linear`

    image.css('transition', transitionString ?? 'none')

    image.css('filter', blur ? `blur(${parseInt(blur * blurGame.blurMultiplier)}px)` : 'none')
    image.css('opacity', opacity === undefined ? '100%' : opacity + '%')

    if (path)
        image.attr('src', path)

    if (imageId != 'imageAlwaysBlurry') {
        if (blur > 100)
            setImage('imageAlwaysBlurry', path, 100, 1, 0, 0)
        else if (blur > 1)
            setImage('imageAlwaysBlurry', path, 100, 1, 100 - blur, 1)
    }
}

function updateScore(game) {
    if (game.currentPoints > 0)
        $('#score').html('Score: ' + game.totalPoints + '/' + game.totalPossiblePoints + ' (+' + game.currentPoints + ')')
    else
        $('#score').html('Score: ' + game.totalPoints + '/' + game.totalPossiblePoints)
}

function resetInput() {
    var selectedAutocomplete = 0
    $('#input').val('')
    $('#input').focus()
    onkey()
}

function setInput(input) {
    var selectedAutocomplete = 0
    $('#input').val(input)
    $('#input').focus()
    onkey()
}

var selectedAutocomplete = 0

async function onkey(e) {

    let inputText = $('#input').val()
    let ac = $('#autocomplete')
    ac.empty()

    if (!inputText)
        return

    let names = blurGame.allNames.filter(x => x.startsWith(inputText))
    names = names.slice(0, Math.min(names.length, 5))
    names.forEach(name => {
        let part = $(`<button class='button box autocompletePart' onclick='setInput("${name}")'>${name}</button>`)
        ac.append(part)
    });

    if (e) {

        let key = e.originalEvent.keyCode

        if (key == 38) {// up

            selectedAutocomplete++
            children = ac.children()

            if (selectedAutocomplete > children.length)
                selectedAutocomplete = children.length

            let last = children[children.length - selectedAutocomplete]
            $(last).focus()

            return
        }

        if (key == 40) {// down 

            selectedAutocomplete--
            children = ac.children()

            if (selectedAutocomplete <= 0) {
                selectedAutocomplete = 0
                $('#input').focus()

            } else {

                let last = children[children.length - selectedAutocomplete]
                $(last).focus()
            }

            return
        }
    }
}















// const MAX_POINTS_NORMAL = 3, MAX_BLUR_NORMAL = 100
// const MAX_POINTS_TIMED = 200, MAX_BLUR_TIMED = 50
// const TIME_BEFORE_TIMED = 2000, TIMED_MILIS = 100

// var used = []
// var champName

// var totalPoints = 0, totalPossiblePoints = 0, currentPoints = 0

// function gameEnd() {
//     $('#finalScore').html(`FINAL SCORE: ${totalPoints} / ${totalPossiblePoints}`)
//     $('#menu').show()
//     $('#game').hide()
//     $('#menuButtons').hide()
//     $('#helpText').hide()
//     $('#gameEnd').show()
//     $('#finalScore').show()
// }

// function changeGameMode() {
//     gameMode = gameMode == 'timed' ? 'normal' : 'timed'
//     console.log('game mode set: ' + gameMode)
//     $('#gameModeButton').html('GAME MODE: ' + gameMode.toUpperCase())
// }

// function nextRound() {
//     $('#nextChampionButton').hide();
//     $('#inputSubmitBox').show();

//     if (_hasEnded(used)) {
//         gameEnd()
//         enterFunc = () => { }
//         return
//     }

//     let champ = _getRandomName()
//     while (used.includes(champ))
//         champ = _getRandomName()

//     champName = champ
//     used.push(champName)

//     initRound()
//     updateScore()
//     resetInput()
//     enterFunc = submitClicked

//     if (gameMode == 'timed')
//         startTimedMode()
// }

// function initRound() {
//     if (gameMode == 'normal') {
//         initNormalRound()
//     }

//     if (gameMode == 'timed') {
//         initTimedMode()
//     }
// }


// // █▄ █ ▄▀▄ █▀▄ █▄ ▄█ ▄▀▄ █
// // █ ▀█ ▀▄▀ █▀▄ █ ▀ █ █▀█ █▄▄

// function initNormalRound() {
//     currentPoints = MAX_POINTS_NORMAL
//     totalPossiblePoints += MAX_POINTS_NORMAL
//     setImage('image', champ, MAX_BLUR_NORMAL)
// }

// function submit() {

//     let championName = champName.replace(/\s/g, '').toLowerCase()
//     let inputText = $('#input').val().replace(/\s/g, '').toLowerCase()

//     if (championName == 'rakan') championName = 'xayah'
//     if (inputText == 'rakan') inputText = 'xayah'

//     if (inputText == championName)
//         win()
//     else
//         failedSubmit()

//     updateScore()
//     resetInput()
// }

// function failedSubmit() {

//     if (gameMode == 'normal') {

//         currentPoints--

//         let normalCurrentBlur = MAX_BLUR_NORMAL * currentPoints / MAX_POINTS_NORMAL
//         setImage('image', null, normalCurrentBlur, 1)

//         if (currentPoints == 0)
//             lose()
//     }

// }

