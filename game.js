let isPlaying = false;

if (isPlaying === false) {
  newGame();
}

//color array
const buttonColours = ["red", "blue", "green", "yellow"];

//holder for color pattern
let gamePattern = [];

//holder for user click pattern
let userClickedPattern = [];

//level
let level = 0;

//for checking answer
let currentLevel = 0;

function newGame() {
  $(document).keydown(function (e) {
    if (isPlaying === true) {
      $("h1").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    } else {
      nextSequence();
      isPlaying = true;
    }
  });
}

//plays sound based on color clicked or randomized
function playSound(color) {
  const colourSound = new Audio(`sounds/${color}.mp3`);
  colourSound.play();
}

//animation for clicking on a color
function animatePress(colorElement) {
  $(colorElement).addClass("pressed");
  setTimeout(() => {
    $(colorElement).removeClass("pressed");
  }, 100);
}

//flash title for any unwanted user inputs
function flashTitle() {
  $("h1").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

//determines the next color chosen by game
function nextSequence() {
  level += 1;
  $("h1").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  //returns random # between 0 - 3

  //randomized by randomNumber
  const randomChosenColour = buttonColours[randomNumber];
  // console.log(randomChosenColour);

  //flash event for the chosen color
  // gamePattern.push(randomChosenColour); push color to gamePattern
  $(`.${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound for random color
  playSound(randomChosenColour);

  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
}

$(".btn").click(function () {
  if (isPlaying === false) {
    flashTitle();
  } else {
    //select color id
    const userChosenColour = $(this).attr("id");

    animatePress(this);

    //play sound corresponding with user click of color
    playSound(userChosenColour);

    //push user chosen color to click pattern arr
    userClickedPattern.push(userChosenColour);

    checkAnswer(userChosenColour);
  }
});

function checkAnswer(color) {
  console.log(gamePattern[currentLevel]);
  if (color === gamePattern[currentLevel]) {
    console.log("success");
    currentLevel += 1;
  } else {
    console.log("wrong");
    gameOver();
  }

  if (currentLevel === gamePattern.length && isPlaying) {
    // //next sequence with delay
    setTimeout(() => {
      nextSequence();
      userClickedPattern = [];
      currentLevel = 0;
    }, 1000);
  }
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  starOver();
}

function starOver() {
  isPlaying = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  currentLevel = 0;
}
