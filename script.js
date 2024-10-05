const pi = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019";
let currentIndex = 0;
let currentLimit = 20;
let points = 0;
let timeLeft = 0;
let timerInterval;
let gamePoints = 0;

// Start the game and set timer
function startGame(limit, time) {
    currentLimit = limit;
    currentIndex = 0;
    timeLeft = time;
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    document.getElementById('pi-digits').textContent = "3.";
    document.getElementById('digit-input').disabled = false;
    document.getElementById('digit-input').focus();
    document.getElementById('result').textContent = '';
    document.getElementById('timer').textContent = timeLeft;

    // Set points based on difficulty level
    if (limit === 20) {
        gamePoints = 10;
    } else if (limit === 60) {
        gamePoints = 20;
    } else if (limit === 100) {
        gamePoints = 30;
    } else if (limit === 150) {
        gamePoints = 40;
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            stopGame('Time is up! You failed to complete the challenge.');
        }
    }, 1000);
}

function stopGame(message) {
    clearInterval(timerInterval);
    document.getElementById('result').innerHTML = `<span class="error">${message}</span>`;
    document.getElementById('digit-input').disabled = true;
    gamePoints = 0;  // No points if the user fails
}

function checkDigit() {
    const input = document.getElementById('digit-input').value;
    const resultDiv = document.getElementById('result');
    const soundEffect = document.getElementById('pop-sound');

    if (input === pi[currentIndex]) {
        soundEffect.play();
        document.getElementById('pi-digits').textContent += input;
        currentIndex++;
        resultDiv.textContent = "";
    } else {
        stopGame('Incorrect! You reached ' + (currentIndex + 2) + ' digits (including the 3).');
        return;
    }

    document.getElementById('digit-input').value = "";

    if (currentIndex >= currentLimit) {
        clearInterval(timerInterval);
        document.getElementById('result').textContent = "Congratulations! You've completed the challenge!";
        document.getElementById('digit-input').disabled = true;
        points += gamePoints;  // Add points based on the difficulty level
        updatePoints();
    }
}

function updatePoints() {
    document.getElementById('points').textContent = points;
    document.getElementById('points-game').textContent = points;
}

function returnHome() {
    document.getElementById('home-screen').style.display = 'flex';
    document.getElementById('game-screen').style.display = 'none';
    clearInterval(timerInterval);
}

document.getElementById('digit-input').addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        checkDigit();
    }
});
