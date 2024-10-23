let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('start-stop-btn');
const lapResetBtn = document.getElementById('lap-reset-btn');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return String(unit).padStart(2, '0');
}

// User Story 5 and 6: Start/Stop button functionality
startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
        isRunning = true;
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor = 'red';
        lapResetBtn.textContent = 'Lap';
    } else {
        stopTimer();
        isRunning = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = 'green';
        lapResetBtn.textContent = 'Reset';
    }
});

// User Story 6 and 8: Lap/Reset button functionality
lapResetBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsContainer.prepend(li);
    } else {
        elapsedTime = 0;
        timeDisplay.textContent = '00:00:00';
        lapsContainer.innerHTML = '';
    }
});
