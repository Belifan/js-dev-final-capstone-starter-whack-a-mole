const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  const index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
 * Calls the showUp function if time > 0 and stops the game if time = 0.
 */
function gameOver() {
  if (time > 0) {
    const timeoutId = showUp();
    return timeoutId;
  } else {
    const gameStopped = stopGame();
    return gameStopped;
  }
}

/**
 * Calls the showAndHide() function with a specific delay and a hole.
 */
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * Shows and hides the mole given a delay time and the hole.
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

/**
 * Adds or removes the 'show' class to a given hole.
 */
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}

/**
 * Increments the points and updates the scoreboard.
 */
function updateScore() {
  points += 1;
  score.textContent = points;
  return points;
}

/**
 * Clears the score by setting points = 0.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * Updates the timer display if time > 0.
 */
function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
 * Starts the timer using setInterval.
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * Event handler for when a player clicks on a mole.
 */
function whack(event) {
  updateScore();
  return points;
}

/**
 * Adds the 'click' event listeners to the moles.
 */
function setEventListeners() {
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });
  return moles;
}

/**
 * Sets the duration of the game.
 */
function setDuration(duration) {
  time = duration;
  return time;
}

/**
 * Stops the game and clears the timer.
 */
function stopGame() {
  clearInterval(timer);
  return "game stopped";
}

/**
 * Starts the game when the start button is clicked.
 */
function startGame() {
  clearScore();
  stopGame();
  setDuration(10);
  setEventListeners();
  startTimer();
  showUp();
  return "game started";
}

startButton.addEventListener("click", startGame);

// Create a custom cursor
const cursor = document.createElement('div');
cursor.innerHTML = '🔨';
cursor.style.cssText = 'position: fixed; font-size: 30px; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Hide default cursor on grid
document.querySelector('.grid').style.cursor = 'none';





// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
