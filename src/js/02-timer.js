import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');
let selectedDate;

const makeButtonDisable = btn => {
  btn.setAttribute('disabled', 'true');
  btn.classList.remove('active-btn');
};

const makeButtonAble = btn => {
  btn.removeAttribute('disabled');
  btn.classList.add('active-btn');
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      makeButtonAble(startBtn);
      selectedDate = selectedDates[0];
    }
  },
};

makeButtonDisable(startBtn);
flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  makeButtonDisable(startBtn);

  const timerId = setInterval(() => {
    let difference = selectedDate - Date.now();

    if (difference <= 0) {
      clearInterval(timerId);
      Notify.success('timer is over. Please choose new date');
    } else {
      days.textContent = convertMs(difference).days;
      hours.textContent = convertMs(difference).hours;
      minutes.textContent = convertMs(difference).minutes;
      seconds.textContent = convertMs(difference).seconds;
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
