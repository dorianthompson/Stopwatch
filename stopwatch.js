let timerId;
let timePassedSinceLastStart = 0;
let lastStartTime = 0;
let isStart = true;

const timer = document.getElementById('timer');
const stopButton = document.getElementById('stop-button');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const lockButton = document.getElementById('lock-button');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lockButton.addEventListener('click', startAndStopTimer);

function startTimer() {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;

    lastStartTime = Date.now();
    isStart = false;

    timerId = requestAnimationFrame(updateTimer);
}

function stopTimer() {
    stopButton.disabled = true;
    startButton.disabled = false;
    resetButton.disabled = false;

    timePassedSinceLastStart += Date.now() - lastStartTime;

    isStart = true;

    cancelAnimationFrame(timerId);
}

function startAndStopTimer() {
    if (isStart) {
        startTimer()
    } else {
        stopTimer()
    }
}

function resetTimer() {
    resetButton.disabled = true;
    timer.textContent = "00:00:000";

    timePassedSinceLastStart = 0;

    isStart = true;
}

function updateTimer() {
    const millisPassed = Date.now() - lastStartTime + timePassedSinceLastStart;
    const secondsPassed = millisPassed / 1000;
    const minutesPassed = secondsPassed / 60;

    const millisText = formatNumber(millisPassed % 1000, 3);
    const secondsText = formatNumber(Math.floor(secondsPassed % 60), 2);
    const minutesText = formatNumber(Math.floor(minutesPassed % 60));

    timer.textContent = `${minutesText}:${secondsText}:${millisText}`;
    timerId = requestAnimationFrame(updateTimer);
}

function formatNumber(number, length){
    const stringNumber = String(number);

    return stringNumber.padStart(length, "0");
}