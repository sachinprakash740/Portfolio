' use strict';

const aboutBtns = document.querySelectorAll('.about-btn');
const aboutInfo = document.querySelectorAll('.about-info-common');

////////////////  for info section//////////////////////////////////////////////////

aboutBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    aboutBtns.forEach((b) => {
      b.classList.remove('about-btn-active');
    });
    btn.classList.add('about-btn-active');
    aboutInfo.forEach((abt) => {
      abt.classList.remove('about-info-active');
    });
    const data = btn.dataset.set;
    document
      .querySelector(`.about-content-${data}`)
      .classList.add('about-info-active');
  });
});

/////////////////////////////f ---for project -sliders---/////////////

const cards = document.querySelectorAll('.project-card');
const nextBtn = document.querySelector('.button-r');
const prevBtn = document.querySelector('.button-l');

let index = 0;

const cardsPosition = function () {
  const length = cards.length;
  cards.forEach((card, i) => {
    card.className = 'project-card';
    card.style.pointerEvents = 'none';
    let diff = i - index;

    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;

    if (diff === 0) {
      card.classList.add('active1');
      card.style.pointerEvents = 'auto';
    } else if (diff === 1) card.classList.add('next1');
    else if (diff === 2) card.classList.add('next2');
    else if (diff === -1) card.classList.add('prev1');
    else if (diff === -2) card.classList.add('prev2');
    else card.classList.add('hidden1');
  });
};

nextBtn.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  cardsPosition();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  cardsPosition();
});

cardsPosition();

///// for each position ////

//  const length = cards.length;
//   cards.forEach((card, i) => {
//     let diff = i - index;

//     if (diff > length / 2) diff - +length;
//     if (diff < -length / 2) diff + -length;

//     if (i === index) {
//       card.classList.add('active1');
//       card.style.pointerEvents = 'auto';
//     }
//     if (i === index + 1) card.classList.add('next1');
//     if (i === index + 2) card.classList.add('next2');
//     if (i === index + length - 1) card.classList.add('prev1');
//     if (i === index + length - 2) card.classList.add('prev2');
//   });

//////////////////// for nav bar links- scroll////////////

const navItems = document.querySelectorAll('.nav-items');

navItems.forEach((item) => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const data = item.dataset.set;
    document
      .querySelector(`#section-${data}`)
      .scrollIntoView({ behavior: 'smooth' });
  });
});

///// scroll to connect section///////

const contactBtn = document.querySelectorAll('.contact-btn');

contactBtn.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#connect').scrollIntoView({ behavior: 'smooth' });
  });
});

/////// section observer/////////////////////////////////////////////////////////

const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(
  function (entries, unobserver) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      entry.target.classList.add('section-active');
      unobserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0.3,
  }
);

sections.forEach((sec) => {
  sectionObserver.observe(sec);
});

window.history.scrollRestoration = 'manual';
window.addEventListener('load', function () {
  window.scrollTo(0, 0);
});

///////////////////////////// end arrow btn//////////////////

const arrowBtn = document.querySelector('.move-Top');

arrowBtn.addEventListener('click', function () {
  document.querySelector('#section-1').scrollIntoView({ behavior: 'smooth' });
});
