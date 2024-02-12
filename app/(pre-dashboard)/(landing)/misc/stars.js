import { TweenMax } from 'gsap/TweenMax';

// Amount of stars
function createStars(numberOfStars) {
  for (let i = 0; i < numberOfStars; i++) {
    placeStarRandomly();
  }
}

const possibleColorClasses = ['triangle-orange-star', 'triangle-blue-star'];

// Create Stars
function placeStarRandomly() {
  const tmpStar = document.createElement('div');
  tmpStar.classList.add(
    possibleColorClasses[
      Math.floor(Math.random() * possibleColorClasses.length)
    ],
  );

  tmpStar.style.position = 'absolute';
  tmpStar.style.top = 98 * Math.random() + '%';
  tmpStar.style.left = 100 * Math.random() + '%';
  document.getElementById('starryBackground').appendChild(tmpStar);
}

function animateStars() {
  for (let i = 0; i < possibleColorClasses.length; i++) {
    const stars = document.querySelectorAll('.' + possibleColorClasses[i]);
    Array.prototype.forEach.call(stars, function (el) {
      TweenMax.to(el, Math.random() * 0.5 + 0.5, {
        opacity: Math.random(),
        onComplete: animateStars,
      });
    });
  }
}

export function initStars(numberOfStars) {
  createStars(numberOfStars);
  animateStars();
}
