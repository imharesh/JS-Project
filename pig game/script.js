'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



let score, currentScore, ActivePlayer, playing;
// staring coditions


const init = function() {

    score = [0, 0];
    currentScore = 0;
    ActivePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

};
init();

const switchPlayer = function() {
    document.getElementById(`current--${ActivePlayer}`).textContent = 0;
    currentScore = 0;
    ActivePlayer = ActivePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//rolling dicefunctionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        // 1. genrating random dice roll 
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice 
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;


        // 3. cheak for rolled 1 : if true , swith to next player. 
        if (dice !== 1) {
            // Add dice to current score
            currentScore = currentScore + dice;
            document.getElementById(`current--${ActivePlayer}`).textContent = currentScore;


        } else {
            // Swith to next player 
            // document.getElementById(`current--${ActivePlayer}`).textContent = 0;
            // currentScore = 0;
            // ActivePlayer = ActivePlayer === 0 ? 1 : 0;
            // player0El.classList.toggle('player--active');
            // player1El.classList.toggle('player--active');
            switchPlayer();

        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. add current score to active players score
        score[ActivePlayer] += currentScore;
        // score[1] = score[1] + currentScore;
        document.getElementById(`score--${ActivePlayer}`).textContent = score[ActivePlayer];

        // 2. cheack if players score is >= 100
        if (score[ActivePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${ActivePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${ActivePlayer}`).classList.remove('player--active');

            // finish the game 
        } else {
            // switch to the next player
            // document.getElementById(`current--${ActivePlayer}`).textContent = 0;
            // currentScore = 0;
            // ActivePlayer = ActivePlayer === 0 ? 1 : 0;
            // player0El.classList.toggle('player--active');
            // player1El.classList.toggle('player--active');
            switchPlayer();

        }
    }


});

btnNew.addEventListener('click', init);