'use strict';

const p0 = document.querySelector('.player--0');
const p1 = document.querySelector('.player--1');
const s0 = document.querySelector('#score--0');
const s1 = document.querySelector('#score--1');
const c0 = document.getElementById('current--0');
const c1 = document.getElementById('current--1');
const d1 = document.querySelector('.dice');
const btN = document.querySelector('.btn--new');
const btR = document.querySelector('.btn--roll');
const btH = document.querySelector('.btn--hold');


let scores, currentS, activeP, playing;

const init = function () {
  scores = [0, 0];
  currentS = 0;
  activeP = 0;
  playing = true;

  s1.textContent = 0;
  s0.textContent = 0;
  c0.textContent = 0;
  c1.textContent = 0;

  d1.classList.add('hidden');
  p0.classList.remove('player--winner');
  p1.classList.remove('player--winner');
  p0.classList.add('player--active');
  p1.classList.remove('player--active');
};

init();

const chnageP = function () {
  document.getElementById(`current--${activeP}`).textContent = 0;
  currentS = 0;
  activeP = activeP === 0 ? 1 : 0;
  p0.classList.toggle('player--active');
  p1.classList.toggle('player--active');
};

// die roll
btR.addEventListener('click', function () {
  if (playing) {
    // random dice generating

    const dice = Math.trunc(Math.random() * 6) + 1;

    // dice display
    d1.classList.remove('hidden');
    d1.src = `dice-${dice}.png`;

    //   check the condition if it is true , go to next player
    if (dice !== 1) {
      // add dice to current score
      currentS += dice;
      document.getElementById(`current--${activeP}`).textContent = currentS;
    } else {
      chnageP();
    }
  }
});

btH.addEventListener('click', function () {
  if (playing) {
    // add score into current player

    scores[activeP] += currentS;
    document.getElementById(`score--${activeP}`).textContent = scores[activeP];

    //   check player score >= 100
    if (scores[activeP] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activeP}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeP}`)
        .classList.remove('player--active');
      d1.classList.add('hidden');
    } else {
      chnageP();
    }
    //   finish game

    //   change to next player
    chnageP();
  }
});

btN.addEventListener('click', init);
