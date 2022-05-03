'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (p) {
    p.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// My code

// header

const header = document.querySelector('.header');

//------header cookie implement------

const msg = document.createElement('div');
msg.classList.add('cookie-message');

msg.innerHTML =
    'We are using cookie for your improvements. <button class="btn btn--close-cookie">Got it </button>';
header.append(msg);

// close cookie button
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
        msg.remove();
        // msg.parentElement.removeChild(msg);
    });

// style header
msg.style.backgroundColor = '#565c57';
msg.style.borderRadius = '10px';
msg.style.width = '104%';
msg.style.height = '70px';

// sections
const allsection = document.querySelectorAll('.section');

// button
const allbutton = document.getElementsByTagName('button');


// change style of all property
document.documentElement.style.setProperty('--color-primary', 'skyblue');

//scroll functionality 
const scrollpage = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

scrollpage.addEventListener('click', function (e) {

    section1.scrollIntoView({ behavior: "smooth" });
});


// for nav scroll 
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    });
});
*/

document.querySelectorAll('.nav__link').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('nav__link')) {
            const id = this.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: "smooth" });
        }
    });
});


// tab opening and closeing 

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
    const clicktab = e.target.closest('.operations__tab');
    // console.log(clicktab)

    if (!clicktab) return;

    // activate tab 
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabContent.forEach(c => c.classList.remove('operations__content--active'));
    clicktab.classList.add('operations__tab--active');

    // activate content 
    document.querySelector(`.operations__content--${clicktab.dataset.tab}`).classList.add('operations__content--active');
});


// navigation bar sticky 
// const initialCord = section1.getBoundingClientRect();
// console.log(initialCord.scrollY)
// window.addEventListener('scroll', function () {
//     if (window.scrollY > initialCord.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// }); 

// navigation bar sticky 
const nav = document.querySelector('.nav')
const navH = nav.getBoundingClientRect().height;
// console.log(navH)

const stickynav = function (enteries) {
    const [entry] = enteries

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const headerObeserver = new IntersectionObserver
    (stickynav, {
        root: null,
        threshold: 0,
        rootMargin: `-${navH}px`
    }
    );

headerObeserver.observe(header)

// loading images 
// taking all img attribut but not taking those which do not have '------data-src----'
const imagepick = document.querySelectorAll('img[data-src]');
const loadIMG = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;


    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
};

const imageOb = new IntersectionObserver(loadIMG, {
    root: null,
    threshold: 0,
    rootMargin: '-200px'
});

imagepick.forEach(img => imageOb.observe(img));

// slider making
const slider = function () {

    const slides = document.querySelectorAll('.slide');
    const btnL = document.querySelector('.slider__btn--left');
    const btnR = document.querySelector('.slider__btn--right');
    const dotC = document.querySelector('.dots');

    let CurSlide = 0;
    const maxslide = slides.length;

    // for dots

    const createdot = function () {
        slides.forEach(function (_, i) {
            dotC.insertAdjacentHTML('beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };

    const activatedot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
    };

    const goToslide = function (slide) {
        slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`))
    };

    const nextslide = function () {
        if (CurSlide === maxslide - 1) {
            CurSlide = 0;
        } else {
            CurSlide++;
        }
        goToslide(CurSlide);
        activatedot(CurSlide);
    }

    const lastslide = function () {
        if (CurSlide === 0) {
            CurSlide = maxslide - 1;
        } else {
            CurSlide--;
        }
        goToslide(CurSlide);
        activatedot(CurSlide);

    };

    const init = function () {
        goToslide(0);
        createdot();

        activatedot(0);
    };
    init();

    btnR.addEventListener('click', nextslide);
    btnL.addEventListener('click', lastslide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') lastslide();
        e.key === 'ArrowRight' && nextslide();
    });

    dotC.addEventListener('.click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToslide(slide);
            activatedot(slide);
        }
    })
}
slider();
