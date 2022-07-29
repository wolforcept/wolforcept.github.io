class NormalMode {

    name = "NORMAL"

    getTimedBlur() {
        let _blur = MAX_BLUR_TIMED * currentPoints / MAX_POINTS_TIMED
        return _blur * _blur;
    }

    initGameMode() {
        currentPoints = MAX_POINTS_TIMED
        totalPossiblePoints += MAX_POINTS_TIMED
        setImage('image', champ, MAX_BLUR_TIMED)
    }

    startTimedMode() {

        setImage('image', null, getTimedBlur())

        function timer() {
            currentPoints--
            setImage('image', null, getTimedBlur())
            updateScore()
            if (currentPoints == 0)
                lose()
        }
        setTimeout(() => {
            timerFunc = setInterval(timer, TIMED_MILIS);
        }, TIME_BEFORE_TIMED)
    }

    submit() {
    }
}

class TimedMode {
    name = "TIMED"
}

var enterFunc = gameStart
var list, _used = []
var currentName
var _getImagePath
var _getRandomName
var _hasEnded
var _gameModes = [new NormalMode(), new TimedMode()]
var _gameMode = _gameModes[0]

function initBlurs({ title, description, getImagePath, getRandomName, hasEnded, nextRoundText }) {

    _getImagePath = getImagePath
    _getRandomName = getRandomName
    _hasEnded = hasEnded

    $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../style.css'));

    $('body').on('keypress', e => { if ((e.keyCode || e.which) == 13) enterFunc() })

    $('#content').load('../content.html', () => {
        setImage('titleImage', _getRandomName(), 100)

        $('#title').html(title)
        $('#helpText').html(description)
        $('#game').hide()
        $('#gameEnd').hide()
        $('#finalScore').hide()

        if (nextRoundText)
            $('#nextRoundButton').html(nextRoundText.toUpperCase())
    })

}

function initGame() {
    $('#menu').hide()
    $('#game').show()
    _gameMode.initGameMode()
    initRound()
    startRound()
}

function startRound() {
    $('#nextRoundButton').hide();
    $('#inputSubmitBox').show();
    _gameMode.startRound()
    enterFunc = nextRoundClicked
}

function finishRound() {
    $('#nextRoundButton').show();
    $('#inputSubmitBox').hide();
}

// █ █▄ █ █▀▄ █ █ ▀█▀ ▄▀▀ 
// █ █ ▀█ █▀  ▀▄█  █  ▄█▀ 

function gameStartClicked() {
    console.log("GAME START")
    initGame()
}

function nextRoundClicked() {
    console.log("NEXT ROUND")
    initRound()
}

function submitClicked() {
    console.log("SUBMIT")
    _gameMode.submit()
}

function changeGameModeClicked() {
    let newIndex = _gameModes.findIndex(x => x == _gameMode) + 1
    if (newIndex >= _gameModes.length)
        newIndex = 0
    _gameMode = _gameModes[newIndex]

    setGameModeButton(_gameMode.name)

    console.log("CHANGE GAME MODE: " + _gameMode)
}

// ▄▀▄ █ █ ▀█▀ █▀▄ █ █ ▀█▀ ▄▀▀ 
// ▀▄▀ ▀▄█  █  █▀  ▀▄█  █  ▄█▀ 


function setGameModeButton(newText) {
    $('#gameModeButton').html('GAME MODE: ' + newText.toUpperCase())
}

// ▄▀▄ ▀█▀ █▄█ ██▀ █▀▄ 
// ▀▄▀  █  █ █ █▄▄ █▀▄ 

function setImage(imageId, name, blur, blurTransition, opacity, opacityTransition) {
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

    if (name)
        image.attr('src', _getImagePath(name))

    if (imageId != 'imageAlwaysBlurry') {
        if (blur > 100)
            setImage('imageAlwaysBlurry', name, 100, 1, 0, 0)
        else if (blur > 1)
            setImage('imageAlwaysBlurry', name, 100, 1, 100 - blur, 1)
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


// function resetInput() {
//     $('#input').val('')
//     $('#input').focus()
// }

// function win() {
//     setImage('image', null, null, 1)
//     totalPoints += currentPoints
//     currentPoints = 0
//     updateScore()
//     gameReset()
//     if (gameMode == 'timed')
//         clearInterval(timerFunc)
// }

// function lose() {
//     gameReset()
//     updateScore()
//     if (gameMode == 'timed')
//         clearInterval(timerFunc)
// }

// function updateScore() {
//     if (currentPoints > 0)
//         $('#score').html('Score: ' + totalPoints + '/' + totalPossiblePoints + ' (+' + currentPoints + ')')
//     else
//         $('#score').html('Score: ' + totalPoints + '/' + totalPossiblePoints)
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

