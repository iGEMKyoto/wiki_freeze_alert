$(function(){

/* October 17 wiki FREEZE at 12:00PM EDT */
var year = 2014;
var month = 10;
var day = 10;
var freeze = Date.UTC(year, month-1, day, 4, 00, 0);

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

/*
 * return array of the quoteient and remainder
 */
function qr(dividend, divisor) {
    return [Math.floor(dividend/divisor),
        dividend%divisor];
}

function repeat_str(str, n) {
    var retval = '';
    for (var i = 0; i < n; i++) {
        retval += str;
    }
    return retval;
}

/*
 * transfer Integer to String
 */
function itos(number, figures) {
    return [repeat_str('0', figures-1),number]
        .join('').slice(-figures);
}

var timer = setInterval(function() {
    //var countdown = document.getElementById("kyoto_alert");
    var $countdown = $("#kyoto_alert");
    var current_utc = get_current_utc();
    var interval = (freeze - current_utc)/1000;
    if (interval < 0) {
        $countdown.hide();
    } else if (interval < 4 * 24 * 3600) {
        if (interval < 1 * 3600)
            $countdown.css("color", "#f00");
        else if (interval < 24 * 3600)
            $countdown.css("color", "#ff0");

        var time = [];
        var second_qr = qr(interval, 60);
        time.push(itos(second_qr[1], 2) + 's');
        var minute_qr = qr(second_qr[0], 60);
        time.push(itos(minute_qr[1], 2) + 'm');
        time.push(itos(minute_qr[0], 2) + 'h');
        $countdown.text(time.reverse().join(' : '));
        $countdown.show();
    } else {
        var time = [];
        interval = Math.floor(interval / 60);
        var minute_qr = qr(interval, 60);
        time.push(itos(minute_qr[1], 2) + 'm');
        var hour_qr = qr(minute_qr[0], 24);
        time.push(itos(hour_qr[1], 2) + 'h');
        time.push(itos(hour_qr[0], 3) + 'd');
        $countdown.text(time.reverse().join(' : '));
        $countdown.show();
    }
}, 200);

$("#kyoto_alert").draggable();

});
