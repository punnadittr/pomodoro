const timer = document.querySelector('.time-text');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const mainSlider = document.querySelector('.slider');
const pomodoro = document.querySelector('.pomodoro');
const shortbreak = document.querySelector('.shortbreak');
const longbreak = document.querySelector('.longbreak');
const shortBreakSlider = document.querySelector('.short-slider');
const longBreakSlider = document.querySelector('.long-slider');
const ding = new Audio('ding.wav');
const title = document.querySelector('title');
let sessionCounter = 0;
let breakPassed = false;
let endedMainTime = false;
let clickedStart = false;
let startTime;

let mainMinutes = '25';
let mainSeconds = '00';

let shortMinutes = '05';
let shortSeconds = '00';

let longMinutes = '15';
let longSeconds = '00';

timer.textContent = mainMinutes + ':' + mainSeconds;

function countTime() {
  if (clickedStart == false) {
    startTime = setInterval(countDown, 1000);
    clickedStart = true;
  } else {
    return;
  }
};

function reset() {
  title.textContent = 'Pomodoro Timer';
  clickedStart = false;
  mainMinutes = mainSlider.value;
  shortMinutes = shortBreakSlider.value;
  longMinutes = longBreakSlider.value;
  mainSeconds = '00';
  shortSeconds = '00';
  longSeconds = '00';
  if (mainMinutes > 0 && mainMinutes < 10) {
    mainMinutes = '0' + mainMinutes;
  }
  if (shortMinutes > 0 && shortMinutes < 10) {
    shortMinutes = '0' + shortMinutes;
  }
  if (longMinutes > 0 && longMinutes < 10) {
    longMinutes = '0' + longMinutes;
  }
  timer.textContent = mainMinutes + ':' + mainSeconds;
  clearTimeout(startTime);
};

function pause() {
  clickedStart = false;
  clearTimeout(startTime);
};

function setTime(target, minute, second, details) {
  mainMinutes = mainSlider.value;
  shortMinutes = shortBreakSlider.value;
  longMinutes = longBreakSlider.value;
  if (mainMinutes > 0 && mainMinutes < 10) {
    mainMinutes = '0' + (mainMinutes);
  }
  minute = target;
  details.textContent = target;
  if (minute > 0 && minute < 10) {
    minute = '0' + minute;
  }
  timer.textContent = minute + ':' + second;
};

function countDown() {
  if (mainSeconds > 0 && mainSeconds <= 10) {
    mainSeconds = '0' + (mainSeconds - 1);
  } else if (mainSeconds == 0) {
    mainSeconds = 59;
    if (mainMinutes > 0 && mainMinutes <= 10) {
      mainMinutes = '0' + (mainMinutes - 1);
    } else {
      mainMinutes -= 1;
    }
  } else {
    mainSeconds -= 1;
  }
  if (mainMinutes == '00' && mainSeconds == '00') {
    clearTimeout(startTime);
    timer.textContent = mainMinutes + ':' + mainSeconds;
    ding.play();
    clickedStart = false;
    if (sessionCounter == 3) {
      reset();
      mainMinutes = longMinutes;
      timer.classList.add('long-break-display');
      countTime();
      sessionCounter = 0;
      breakPassed = true;
    } else if (breakPassed == false) {
      reset();
      mainMinutes = shortMinutes;
      sessionCounter += 1;
      countTime();
      timer.classList.add('short-break-display');
      breakPassed = true;
    } else {
      reset();
      countTime();
      timer.classList.remove('short-break-display', 'long-break-display');
      breakPassed = false;
    }
  } else {
    title.textContent = mainMinutes + ':' + mainSeconds + ' Pomodoro Timer';
    timer.textContent = mainMinutes + ':' + mainSeconds;
  }
};

startButton.addEventListener('click', function() {
  countTime(countDown);
});
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

mainSlider.addEventListener('input', function(e) {
  timer.classList.remove('short-break-display', 'long-break-display');
  setTime(e.target.value, mainMinutes, mainSeconds, pomodoro);
});
shortBreakSlider.addEventListener('input', function(e) {
  timer.classList.remove('long-break-display');
  timer.classList.add('short-break-display');
  setTime(e.target.value, shortMinutes, shortSeconds, shortbreak);
});
longBreakSlider.addEventListener('input', function(e) {
  timer.classList.add('long-break-display');
  setTime(e.target.value, longMinutes, longSeconds, longbreak);
});
