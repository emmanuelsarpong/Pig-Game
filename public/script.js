'use strict';

// Select elements for scores
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// const mainEl = document.getElementsByTagName('main');

let scores, currentScore, activePlayer;

// Set the starting conditions
const init = function() {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('plater--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--remove');
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
};

btnRoll.addEventListener('click', function() {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice)

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to next player
        switchPlayer();
    }
});

btnHold.addEventListener('click', function() {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >= 20
    if (scores[activePlayer] >= 20) {
        // Finish game
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceEl.classList.add('hidden');
        btnRoll.disabled = true;
        btnHold.disabled = true;
        alert(`Player ${activePlayer} won!! 🏆`)
    } else {
        // Switch to the next player
        switchPlayer();
    }
});

btnNew.addEventListener('click', function() {
    init();
    btnRoll.disabled = false;
    btnHold.disabled = false;
});

// // Show and hide function for responsiveness alert
// const mainEl = document.getElementsByClassName('.section-top');
// const articleEl = document.getElementsByClassName('.section-bottom');
// const bodyEl = document.body;


// function showHide() {
//   const paragraph = document.getElementById('message');
//   const innerWidth = window.innerWidth;


//   if (innerWidth <= 750) {
//     paragraph.style.display = 'block';
//     paragraph.style.color = 'black';
//     paragraph.style.backgroundColor = 'white';
//     // paragraph.style.fontWeight = '900';
//     bodyEl.style.backgroundColor = 'white';
//     paragraph.style.fontFamily = 'proxima nova light, "Helvetica Neue", Helvetica, Arial, Sans-serif';
//     paragraph.style.position = 'absolute';
//     paragraph.style.top = '50%';
//     paragraph.style.left = '50%';
//     paragraph.style.transform = 'translate(-50%, -50%)';
//     paragraph.style.fontSize = '20px';
//     paragraph.style.textAlign = 'center';
    
//   } else {
//     paragraph.style.display = 'none';
//     mainEl.style.display = 'block';
//   }
// }

// // Call the showHide function when the window is resized
// window.addEventListener('resize', showHide);

// // Initial check on page load
// showHide();  