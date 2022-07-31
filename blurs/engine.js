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

    initGameMode() {
        this.game.currentPoints = 0
        this.game.totalPoints = 0
        this.game.totalPossiblePoints = 0
    }

    startRound() {
        this.game.totalPossiblePoints += this.maxPoints
        this.game.currentName = this.game.getRandomName()
        this.game.currentPoints = 3
        updateScore(this.game)
        setImage('image', this.game.getImagePath(this.game.currentName), this.getBlur())
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

// class TimedMode {
//     name = "TIMED"

//     startTimedMode() {

//         setImage('image', null, getTimedBlur())

//         function timer() {
//             currentPoints--
//             setImage('image', null, getTimedBlur())
//             updateScore(this.game)
//             if (currentPoints == 0)
//                 lose()
//         }
//         setTimeout(() => {
//             timerFunc = setInterval(timer, TIMED_MILIS);
//         }, TIME_BEFORE_TIMED)
//     }
// }

class BlurGame {

    enterFunc
    list
    used = []

    gameModes = [new NormalMode(this)]
    gameMode
    totalPoints = 0
    totalPossiblePoints = 0
    currentPoints = 0
    currentName

    hasEnded() { }
    getImagePath() { }
    getRandomName() { }

    constructor({ title, description, getImagePath, getRandomName, hasEnded, nextRoundText }) {

        this.getImagePath = getImagePath
        this.getRandomName = getRandomName
        this.hasEnded = hasEnded

        this.gameMode = this.gameModes[0]

        this.enterFunc = this.gameStartClicked

        $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../style.css'));

        $('body').on('keypress', e => { if ((e.keyCode || e.which) == 13) this.enterFunc() })

        $('#content').load('../content.html', () => {
            setImage('titleImage', getImagePath(this.getRandomName()), 100)

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
        this.gameMode.initGameMode()
        this.startRound(this)
    }

    startRound() {
        console.log('START ROUND!');
        $('#nextRoundButton').hide()
        $('#inputSubmitBox').show()
        updateScore(this)
        this.gameMode.startRound(this)
        this.enterFunc = this.submitClicked
    }

    endRound() {
        console.log('END ROUND');
        $('#nextRoundButton').show()
        $('#inputSubmitBox').hide()
        updateScore(this)
        this.enterFunc = this.nextRoundClicked
    }

    win() {
        console.log('WIN');
        setImage('image', null, null, 1)
        this.totalPoints += this.currentPoints
        this.currentPoints = 0
        updateScore(this)
        this.endRound()
        if (this.gameMode == 'timed')
            clearInterval(timerFunc)
    }

    lose() {
        console.log('LOSE');
        this.endRound()
        updateScore(this)
        if (this.gameMode == 'timed')
            clearInterval(timerFunc)
    }

    // █ █▄ █ █▀▄ █ █ ▀█▀ ▄▀▀ 
    // █ █ ▀█ █▀  ▀▄█  █  ▄█▀ 

    gameStartClicked() {
        console.log("GAME START")
        this.initGame()
        resetInput()
    }

    nextRoundClicked() {
        this.startRound()
        resetInput()
    }

    submitClicked() {
        console.log("SUBMIT")
        this.gameMode.submit()
        resetInput()
    }

    changeGameModeClicked() {
        let newIndex = this.gameModes.findIndex(x => x == _gameMode) + 1
        if (newIndex >= this.gameModes.length)
            newIndex = 0
        this.gameMode = this.gameModes[newIndex]

        setGameModeButton(this.gameMode.name)

        console.log("CHANGE GAME MODE: " + this.gameMode)
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

    image.css('filter', blur ? `blur(${blur}px)` : 'none')
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
    $('#input').val('')
    $('#input').focus()
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

