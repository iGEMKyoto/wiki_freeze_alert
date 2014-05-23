/* October 17 wiki FREEZE at 11:59PM EDT */
var freeze = Date.UTC(2014, 9, 17, 3, 59, 0);

function get_current_utc() {
    var date = new Date();
    return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
}

var timer = setInterval(function() {
    var countdown = document.getElementById("kyoto_alert");
    var current_utc = get_current_utc();
    var interval = (freeze - current_utc)/1000;
    if (interval < 0) {
        countdown.style.display = "none";
    } else if (interval < 4 * 24 * 3600) {
        if (interval < 1 * 3600)
            countdown.style.color = "#f00";
        else if (interval < 24 * 3600)
            countdown.style.color = "#ff0";

        var second = ('0' + (interval % 60)).slice(-2) + 's';
        interval = Math.floor(interval / 60);
        var minute = ('0' + (interval % 60)).slice(-2) + 'm';
        interval = Math.floor(interval / 60);
        var hour = ('0' + (interval)).slice(-2) + 'h';
        var str = hour + " : " + minute + " : " + second;
        countdown.innerText = str;
        countdown.style.display = "block";
    } else {
        interval = Math.floor(interval / 60);
        var minute = ('0' + (interval % 60)).slice(-2) + 'm';
        interval = Math.floor(interval / 60);
        var hour = ('0' + (interval)).slice(-2) + 'h';
        interval = Math.floor(interval / 24);
        var date = ('00' + (interval)).slice(-3) + 'd';
        var str = date + " : " + hour + " : " + minute;
        countdown.innerText = str;
        countdown.style.display = "block";
    }
}, 200);
