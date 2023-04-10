// Імпортуємо функції
import { convertMs, addLeadingZero } from './common';

// Імпорт flatpickr
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів flatpickr
import 'flatpickr/dist/flatpickr.min.css';
// Імпорт Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Створюємо селектори для відстеження DOM
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// Додаємо слухачів подій
refs.btnStart.addEventListener('click', onBtnClick);

// Створюємо змінну для зберігання часу інтервалу та самого інтервалу
// та робимо кнопку "Start" неактивною за замовченням
const INTERVAL = 1000;
let timeInterval = null;
refs.btnStart.setAttribute('disabled', true);

// Створюємо змінні для зберігання часу
let chosenDate = null;
let actualDate = null;
let timeToFinish = null;

// Опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    actualDate = new Date();
    timeToFinish = chosenDate - actualDate;

    if (timeToFinish > 0) {
      Notify.success('You can start countdown');
      refs.btnStart.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.setAttribute('disabled', true);
    }
  },
};

// Ініціалізуємо flatpickr
flatpickr(refs.input, options);

// Функція для виклику на кнопці "Start"
function onBtnClick() {
  actualDate = new Date();
  timeToFinish = chosenDate - actualDate;
  if (timeToFinish > 0) {
    Notify.success('We are starting countdown');
    startCountdown();
    refs.btnStart.setAttribute('disabled', true);
    refs.input.setAttribute('disabled', true);
  } else {
    Notify.failure('Please choose a date in the future');
    refs.btnStart.setAttribute('disabled', true);
  }
}

// Функції старт та стоп зворотнього відліку
function startCountdown() {
  interfaceUpdate(addLeadingZero(convertMs(timeToFinish)));
  timeInterval = setInterval(() => {
    timeToFinish -= INTERVAL;

    interfaceUpdate(addLeadingZero(convertMs(timeToFinish)));

    if (timeToFinish < INTERVAL) {
      stopCountdown();
      Notify.success('TIME IS OVER');
      refs.btnStart.removeAttribute('disabled');
      refs.input.removeAttribute('disabled');
    }
  }, INTERVAL);
}

function stopCountdown() {
  clearInterval(timeInterval);
}

// Функція для передачі даних в DOM
function interfaceUpdate({
  formatDays,
  formatHours,
  formatMinutes,
  formatSeconds,
}) {
  refs.days.textContent = formatDays;
  refs.hours.textContent = formatHours;
  refs.minutes.textContent = formatMinutes;
  refs.seconds.textContent = formatSeconds;
}
