const timer = document.querySelector('.time-text');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const mainSlider = document.querySelector('.slider');
const pomodoroValue = document.querySelector('.pomodoro');
const shortBreakValue = document.querySelector('.shortBreak');
const longBreakValue = document.querySelector('.longBreak');
const shortBreakSlider = document.querySelector('.short-slider');
const longBreakSlider = document.querySelector('.long-slider');
const timeButtons = document.querySelectorAll('.time-buttons')
const ding = new Audio('ding.wav');
const title = document.querySelector('title');

let sessionCounter = 0;
let breakPassed = false;
let clickedStart = false;
let startTimer;

let mainMinutes = '25';
let mainSeconds = '00';

let shortMinutes = '05';
let shortSeconds = '00';

let longMinutes = '15';
let longSeconds = '00';
// Start the timer //
function countTime() {
  // Prevent the start button to be clicked more than once
  if (clickedStart == false) {
    startTimer = setInterval(countDown, 1000);
    clickedStart = true;
  } else {
    return;
  }
};

// Add padding if the number is less than 10 //
function addPadding(time) {
  if (time < 10) {
    return '0' + time;
  } else {
    return time;
  }
};

// Show minutes and seconds on the display
function initialize() {
  timer.textContent = mainMinutes + ':' + mainSeconds;
};

function getSliderValueAll() {
  mainMinutes = mainSlider.value;
  shortMinutes = shortBreakSlider.value;
  longMinutes = longBreakSlider.value;
};

// Reset the values to slider's values
function reset() {
  timer.classList.remove('short-break-display', 'long-break-display');
  title.textContent = 'Pomodoro Timer';
  clickedStart = false;
  getSliderValueAll();
  mainMinutes = addPadding(mainMinutes);
  shortMinutes = addPadding(shortMinutes);
  longMinutes = addPadding(longMinutes);
  mainSeconds = '00';
  shortSeconds = '00';
  longSeconds = '00';
  initialize();
  clearTimeout(startTimer);
};

// pause the timer
function pause() {
  clickedStart = false;
  clearTimeout(startTimer);
};
// set the time from slider
function setTime(target, minute, second, details) {
  getSliderValueAll();
  mainMinutes = addPadding(mainMinutes);
  minute = target;
  details.textContent = target;
  minute = addPadding(minute);
  timer.textContent = minute + ':' + second;
};

function countDown() {
  if (mainSeconds == 0) {
    mainSeconds = 59;
    mainMinutes -= 1;
    mainMinutes = addPadding(mainMinutes);
  } else {
    mainSeconds -= 1;
  }
  mainSeconds = addPadding(mainSeconds);
  if (mainMinutes == '00' && mainSeconds == '00') {
    startBreak();
  } else {
    title.textContent = mainMinutes + ':' + mainSeconds + ' Pomodoro Timer';
    initialize();
  }
};

function startBreak() {
  clearTimeout(startTimer);
  initialize();
  ding.play();
  clickedStart = false;
  if (breakPassed == false && sessionCounter != 3) {
    console.log("This is shortBreak");
    startSession(true, shortMinutes)
    timer.classList.add('short-break-display');
    sessionCounter += 1;
  } else if (sessionCounter == 3) {
    console.log("This is longbreak");
    startSession(true, longMinutes);
    timer.classList.add('long-break-display');
    sessionCounter = 0;
  } else {
    reset();
    countTime();
    timer.classList.remove('short-break-display', 'long-break-display');
    breakPassed = false;
  }
};

function startSession(breakPassedValue, sessionType) {
  reset()
  mainMinutes = sessionType;
  countTime();
  breakPassed = breakPassedValue;
};
// Buttons and sliders
startButton.addEventListener('click', countTime);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', function() {
  reset();
  sessionCounter = 0;
});

mainSlider.addEventListener('input', function(e) {
  timer.classList.remove('short-break-display', 'long-break-display');
  setTime(e.target.value, mainMinutes, mainSeconds, pomodoroValue);
});
shortBreakSlider.addEventListener('input', function(e) {
  timer.classList.remove('long-break-display');
  timer.classList.add('short-break-display');
  setTime(e.target.value, shortMinutes, shortSeconds, shortBreakValue);
});
longBreakSlider.addEventListener('input', function(e) {
  timer.classList.add('long-break-display');
  setTime(e.target.value, longMinutes, longSeconds, longBreakValue);
});

initialize();
