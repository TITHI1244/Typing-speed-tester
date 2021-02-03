// initial text as a variable
const actualText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const resetBtn = $("#startOver");
const myTimer = $("#timer");

let timer = [0, 0, 0, 0],  
    interval,
    timerRunning = false;

// when the document is loaded and ready
$(document).ready(function(){

	$("#alert").hide();

	$("#overlayBtn").click(function(){
		$("#overlay").show();
	});

	$("#overlay").click(function(){
		$("#overlay").hide();
	});

    $('#actualText p').text(actualText); // setting the initial text

	$("textarea").keypress(function(){
		start();                         // on keypress event, call start function to start the interval
    });

    $("textarea").keyup(function(){
		spellingCheck();                 // on keyup event, call spellingCheck function to check spelling and add the styling accordingly
    });

    $("#startOver").click(function(){
    	reset();                         // on clicking over start over button, reset the interval and start again
    });

});

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;                   // adding an extra zero if time is of 1 digit, to maintain the same alignment
}

function runTimer() {
    var currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    $("#timer").html(currentTime);
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));  // calculating hours, minutes, seconds and miliseconds
}


const start = function(){
	var textEnteredLength = $("textarea").val().length;
	if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;                             // set timerRunning into true and start the interval for every 10 ms, calling runTimer function          
        interval = setInterval(runTimer, 10);
    }
};

const spellingCheck = function(){
    const textEntered = $("textarea").val();              // user input
    const wholeText = $("#actualText p").text();          // the entire text
    const matchedText = wholeText.substring(0, textEntered.length);  // a trimmed string of the text to be matched with user input
    const restOfText = wholeText.substring(textEntered.length, wholeText.length); // rest of the text, yet to be compared
    if (textEntered === $("#actualText p").text()) {    // checking if user inputs accurately the entire text, then clear interval, change styling
        clearInterval(interval);
        $("textarea").css("border-color","#429890");
        $('#actualText p').addClass('correct');
    } else {
        if (textEntered === matchedText) {             // checking if user inputs correctly so far, but not the entire text, then change styling
            let changedSpan = changeColor(textEntered);
            $('#actualText p').empty().prepend(changedSpan);
            $('#actualText p').append(restOfText);
            $("textarea").css("border-color","#65CCf3");
        } else {                                       // checking if user inputs inaccurately, then change styling
            $("textarea").css("border-color","#E95D0F");
        }
    }
};

function changeColor(text) {
    const span = $('<span />').addClass('correct').html(text); // creating a span element and insert the correct part of the text
    return span;
}

function reset() {                                             // reset the interval, set everything as it started
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    $("textarea").val("");
    $('#actualText p').empty().removeClass("correct").text(actualText);
    $("#timer").html("00:00:00");
    $("textarea").css("border-color","grey");
}