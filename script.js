var actualText = $("#actualText p").innerHTML;
var textWrapper = $(".textWrapper");

var resetBtn = $("#startOver");
var myTimer = $("#timer");

var timer = [0,0,0,0],
    interval,
    timerRunning = false;

$(document).ready(function(){

	$("#alert").hide();

	$("#overlayBtn").click(function(){
		$("#overlay").show();
	});

	$("#overlay").click(function(){
		$("#overlay").hide();
	});

	$("textarea").keypress(function(){
		start();
    });

    $("textarea").keyup(function(){
		spellingCheck();
    });

    $("#startOver").click(function(){
    	reset();
    });

});

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

function runTimer() {
    var currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    $("#timer").html(currentTime);
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}


var start = function(){
	var textEnteredLength = $("textarea").val().length;
	if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
};

var spellingCheck = function(){
	let textEntered = $("textarea").val();
    let originTextMatch = $("#actualText p").html().substring(0,textEntered.length);

    if (textEntered == $("#actualText p").html()) {
        clearInterval(interval);
        $("textarea").css("border-color","#429890");
    } else {
        if (textEntered == originTextMatch) {
            $("textarea").css("border-color","#65CCf3");
        } else {
            $("textarea").css("border-color","#E95D0F");
        }
    }
};

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    $("textarea").val("");
    $("#timer").html("00:00:00");
    $("textarea").css("border-color","grey");
}