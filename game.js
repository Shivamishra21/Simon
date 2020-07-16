var start = false;
var level1 = 0

$(document).keypress(function () {
    if (start === false) {
        $("#level-title").text("Level " + level1);
        nextSequence();

        start = true;
    }
});

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function startOver() {
    level1 = 0;
    gamePattern = [];
    start = false;
}


function nextSequence() {

    level1++;
    $("#level-title").text("Level " + level1);
    var randomNo = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColors[randomNo];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];


}


$(".btn").click(function (evt) {

    var userChosenColor = evt.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

})
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor) {
    var header = $("#" + currentColor);
    header.addClass("pressed");
    setTimeout(function () { header.removeClass("pressed") }, 100);
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();


    }

}
