var gamePattern = []
var userClickedPattern = []
var level = 0

var started = false

var buttonColors = ["red","blue","green","yellow"]

$(".btn").click( function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)

})

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
$("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 

  animatePress(randomChosenColor) 
  playSound(randomChosenColor)
  level++
  $("#level-title").text("Level " + level);
 }

function playSound(name) {

var audio = new Audio("sounds/" + name + ".mp3");
audio.play();

}

function animatePress(currentColor) {

$("#"+currentColor).addClass("pressed");
setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
},100
)

}

$(document).keydown(function () {
if (!started) {
    nextSequence();
    started = true;
}
})


// GAME LOGIC


function checkAnswer (currentLevel) {

if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
console.log("suceccs");
  if (gamePattern.length === userClickedPattern.length) {
setTimeout (function () {
  nextSequence();
},1000)  

}
} else {
  gameOver();
  $("#level-title").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  started = false;
}

}

function gameOver () {
  $("body").addClass("game-over")
  playSound("wrong");
  setTimeout( function () {
$("body").removeClass("game-over")
  },200)
}

