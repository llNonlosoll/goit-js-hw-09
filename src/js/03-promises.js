// Імпортуємо функцію
import { createPromise } from './common';

// Імпорт Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Створюємо селектори для відстеження DOM
const refs = {
  form: document.querySelector('.form'),
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
};

// Додаємо слухача подій
refs.form.addEventListener('submit', onFormSubmit);

// Функція для виклику при "Submit"
function onFormSubmit(event) {
  event.preventDefault();
  let position = 0;
  let delay = Number(refs.delayEl.value);
  const step = Number(refs.stepEl.value);
  const amount = Number(refs.amountEl.value);

  for (let i = 0; i < amount; i++) {
    position += 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
