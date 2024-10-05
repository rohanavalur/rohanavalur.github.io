const pi = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019";
let currentIndex = 0;
let currentLimit = 20;
let points = 0;
let timeLeft = 0;
let timerInterval;
let gamePoints = 0;
const maxDigitsInBox = 15; // The max number of digits to show in the box before clearing

// Start the game and set timer
function startGame(limit, time) {
    currentLimit = limit;
    currentIndex = 0;
    timeLeft = time;
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    document.getElementById('pi-digits').textContent = "3."; // Reset to "3."
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
        document.getElementById('pi-digits').textContent += input; // Append digit
        currentIndex++;
        resultDiv.textContent = "";
    } else {
        stopGame('Incorrect! You reached ' + (currentIndex + 2) + ' digits.');
        return;
    }

    // Clear the input field after each digit
    document.getElementById('digit-input').value = "";

    // Check if the number of displayed digits exceeds the max limit in the box
    if (document.getElementById('pi-digits').textContent.length >= maxDigitsInBox) {
        document.getElementById('pi-digits').textContent = ""; // Clear the digits display entirely
    }

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

// Add event listener for the Enter key press in the input
document.getElementById('digit-input').addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        checkDigit();
    }
});

// Adding event listeners to the difficulty buttons
document.getElementById('level1').addEventListener('click', function() {
    startGame(20, 30); // Level 1 (20 digits, 30 seconds)
});

document.getElementById('level2').addEventListener('click', function() {
    startGame(60, 60); // Level 2 (60 digits, 60 seconds)
});

document.getElementById('level3').addEventListener('click', function() {
    startGame(100, 120); // Level 3 (100 digits, 120 seconds)
});

document.getElementById('level4').addEventListener('click', function() {
    startGame(150, 180); // Level 4 (150 digits, 180 seconds)
});
