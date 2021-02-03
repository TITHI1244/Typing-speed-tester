const actualText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const resetBtn = $("#startOver");
const myTimer = $("#timer");

let timer = [0,0,0,0],
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


const start = function(){
	var textEnteredLength = $("textarea").val().length;
	if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
};

const spellingCheck = function(){
    const textEntered = $("textarea").val();
    const wholeText = $("#actualText p").text();
    const matchedText = wholeText.substring(0, textEntered.length);
    const restOfText = wholeText.substring(textEntered.length, wholeText.length);
    if (textEntered === $("#actualText p").text()) {
        clearInterval(interval);
        $("textarea").css("border-color","#429890");
        $('#actualText p').addClass('correct');
    } else {
        if (textEntered === matchedText) {
            let changedSpan = changeColor(textEntered);
            $('#actualText p').empty().prepend(changedSpan);
            $('#actualText p').append(restOfText);
            $("textarea").css("border-color","#65CCf3");
        } else {
            $("textarea").css("border-color","#E95D0F");
        }
    }
};

function changeColor(text) {
    const span = $('<span />').addClass('correct').html(text);
    return span;
}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    $("textarea").val("");
    $('#actualText p').empty().removeClass("correct").text(actualText);
    $("#timer").html("00:00:00");
    $("textarea").css("border-color","grey");
}