// Створюємо селектори для відстеження DOM
const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

// Створюємо змінну для зберігання часу інтервалу та самого інтервалу
// та робимо кнопку "Stop" неактивною за замовченням
const INTERVAL = 1000;
let colorInterval = null;
refs.stop.setAttribute('disabled', true);

// Генератор випадкового кольору
function getRandomHexColor() {
  return (refs.body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  )
    .toString(16)
    .padStart(6, 0)}`);
}

// Додаємо слухачів подій
refs.start.addEventListener('click', onClickStart);
refs.stop.addEventListener('click', onClickStop);

// Функція для запуску зміни кольорів та робимо кнопку "Start" неактивною
function onClickStart() {
  refs.start.setAttribute('disabled', true);
  refs.stop.removeAttribute('disabled');
  colorInterval = setInterval(() => {
    getRandomHexColor();
  }, INTERVAL);
}

// Функція для зупинення зміни кольорів та робимо кнопку "Start" знову активною
function onClickStop() {
  clearInterval(colorInterval);
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', true);
}
