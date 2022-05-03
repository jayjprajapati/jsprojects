'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnclose = document.querySelector('.close-modal');
const btnopen = document.querySelectorAll('.show-modal');
console.log(btnopen);

const openmodal = function () {
  console.log('Button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closemodal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnopen.length; i++)
  btnopen[i].addEventListener('click', openmodal);

btnclose.addEventListener('click', closemodal);
overlay.addEventListener('click', closemodal);

document.addEventListener('keydown', function (f) {
  console.log(f.key);

  if (f.key === 'Escape' && !modal.classList.contains('hidden')) {
    closemodal();
  }
});
