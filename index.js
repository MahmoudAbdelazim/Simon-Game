//save the game pattern and the user clicked pattern in arrays
var gamePattern = [];
var userClickedPattern = [];

//All the available button colors
var buttonColors = ['red', 'green', 'blue', 'yellow'];
var started = false;
var level = 0;

//start the game when the first keypress is detected
$(document).keypress(function() {

  if (started === false) {
    nextSequence();
    started = true;
  }
});

//add every user clicked button to the array
$('.btn').click(function() {
  
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animateClick(userChosenColor);

  //check if the color of the last index is the same as in gamePattern
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  //check if every element in userClickedPattern is as gamePattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    //if the user completed the current sequence, play a new one
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else {}

  //if not, then game over
  } else {
    playSound("wrong");

    $('body').addClass("game-over");
    setTimeout(function () {
      $('body').removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

//add a new random color to the gamePattern array
function nextSequence() {

  userClickedPattern = [];
  level++;
  $('#level-title').text("Level " + level);

  // make a random color using a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//play the game over by reseting the values of started, gamePattern, and level
function startOver() {

  started = false;
  gamePattern = [];
  level = 0;
}

function playSound(name) {

  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

function animateClick(currentColor) {

  $('#' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
