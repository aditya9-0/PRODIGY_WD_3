// script.js
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 1;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        startButton.textContent = "Pause";
        updateDisplay();
        updateButtons();
    } else {
        isRunning = false;
        startButton.textContent = "Resume";
        clearInterval(interval);
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        startButton.textContent = "Resume";
        clearInterval(interval);
        updateButtons();
    }
}

function reset() {
    isRunning = false;
    startTime = null;
    elapsedTime = 0;
    lapCount = 1;
    updateDisplay();
    startButton.textContent = "Start";
    lapsList.innerHTML = "";
    updateButtons();
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCount++;
    }
}

function updateDisplay() {
    interval = setInterval(() => {
        if (isRunning) {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }
    }, 10);
}

function updateButtons() {
    if (isRunning) {
        pauseButton.style.display = "block";
        lapButton.style.display = "block";
        resetButton.style.display = "none";
    } else {
        pauseButton.style.display = "none";
        lapButton.style.display = "none";
        resetButton.style.display = "block";
    }
}

function formatTime(time) {
    const date = new Date(time);
    return date.toISOString().substr(11, 8);
}

reset();
