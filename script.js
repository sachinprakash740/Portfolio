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

//////////////////// for nav bar links- scroll////////////

const navItems = document.querySelectorAll('.nav-items');

navItems.forEach((item) => {
  item.addEventListener('click', function (e) {
    navItems.forEach((im) => im.classList.remove('active'));
    item.classList.add('active');
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
      // for- adding active class on list as scroll///
      navItems.forEach((im) => im.classList.remove('active'));
      const getData = entry.target.dataset.set;

      document
        .querySelector(`.nav-items[data-set="${getData}"]`)
        .classList.add('active');
    }
  },
  {
    threshold: 0.15,
  }
);

sections.forEach((sec) => {
  sectionObserver.observe(sec);
});

window.history.scrollRestoration = 'manual';
window.addEventListener('load', function () {
  window.scrollTo(0, 0);
});

window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    navItems.forEach((im) => im.classList.remove('active'));

    document.querySelector('.nav-items[data-set="1"]').classList.add('active');
  }
});

//////// for menu -bar//////////////////////

const menuButton = document.querySelector('.menu-bar');

const navbarSlider = document.querySelector('.nav-links');

menuButton.addEventListener('click', function () {
  console.log(1);
  navbarSlider.classList.toggle('bar-active');
});

////////////////////////////for nav-bar sticky///////////////////////

const navBar = document.querySelector('.header-navbar');
const sentinel = document.querySelector('.nav-sentinel');

const desktopQuery = window.matchMedia('(min-width: 1024px)');

function initObserver() {
  if (!desktopQuery.matches) return;

  const navBarObserver = new IntersectionObserver(
    function (entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        navBar.classList.add('navBar-active');
      } else navBar.classList.remove('navBar-active');
    },
    {
      root: null,
      threshold: 0,
      rootMargin: '14px',
    }
  );
  navBarObserver.observe(sentinel);
}

initObserver();

///////////////////////////// end arrow btn//////////////////

const arrowBtn = document.querySelector('.move-Top');

arrowBtn.addEventListener('click', function () {
  sentinel.scrollIntoView({ behavior: 'smooth' });
});
