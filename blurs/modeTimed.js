function getTimedBlur() {
    let _blur = MAX_BLUR_TIMED * currentPoints / MAX_POINTS_TIMED
    return _blur * _blur;
}

function initTimedMode() {
    currentPoints = MAX_POINTS_TIMED
    totalPossiblePoints += MAX_POINTS_TIMED
    setImage('image', champ, MAX_BLUR_TIMED)
}

function startTimedMode() {

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

export default ""