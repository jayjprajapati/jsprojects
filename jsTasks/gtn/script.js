'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'corret number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// guessing number

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = 'No number!';
  }

  //   when palayer wins
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'correct number!';
    document.querySelector('body').style.backgroundColor = 'skyblue';
    document.querySelector('.number').textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNumber ? 'higher number ! ' : 'low number!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'you lose game !';
      document.querySelector('.score').textContent = 0;
    }
  }

  /*
  //   when number high
  else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'higher number !';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'you lose game !';
      document.querySelector('.score').textContent = 0;
    }
  }

  //   When number low
  else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'low number !';
      score--;
      document.querySelector('.score').textContent = score;
    }
*/
  // When player lost
  else {
    document.querySelector('.message').textContent = 'you lose game !';
    document.querySelector('.score').textContent = 0;
    document.querySelector('body').style.backgroundColor = 'red';
  }
});

// reset value

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start guessing... ';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
});
