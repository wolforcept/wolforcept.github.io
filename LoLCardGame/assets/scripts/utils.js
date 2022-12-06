function setTimer(callback, interval, keepCondition) {
    var i = 0;
    (async () => callback(i++))()
    var expected = Date.now() + interval;
    setTimeout(step, interval);
    function step() {
        var dt = Date.now() - expected; // the drift (positive for overshooting)
        if (dt > interval) {
            // something really bad happened. Maybe the browser (tab) was inactive?
            // possibly special handling to avoid futile "catch up" run
        }
        (async () => callback(i++))()
        expected += interval;
        if (keepCondition && keepCondition())
            setTimeout(step, Math.max(0, interval - dt)); // take into account drift
    }
}

function getTime() {

    var today = new Date();
    var day = today.getDay();
    var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var prepand = (hour >= 12) ? " PM " : " AM ";
    hour = (hour >= 12) ? hour - 12 : hour;
    if (hour === 0 && prepand === ' PM ') {
        if (minute === 0 && second === 0) {
            hour = 12;
            prepand = ' Noon';
        }
        else {
            hour = 12;
            prepand = ' PM';
        }
    }
    if (hour === 0 && prepand === ' AM ') {
        if (minute === 0 && second === 0) {
            hour = 12;
            prepand = ' Midnight';
        }
        else {
            hour = 12;
            prepand = ' AM';
        }
    }

    return { weekday: daylist[day], hour, minute, second }
}


function transition(id1, id2, callback) {
    $('.transition').css('opacity', 0)
    setTimeout(() => {
        $(id1).hide();
        $(id2).show();
        $('.transition').css('opacity', 1)
        callback && callback()
    }, 500);
}