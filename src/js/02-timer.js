import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const flatpickr = require('flatpickr');

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

const makeButtonDisable = btn => {
  btn.setAttribute('disabled', 'true');
  btn.classList.remove('active-btn');
};

const makeButtonAble = btn => {
  btn.removeAttribute('disabled');
  btn.classList.add('active-btn');
};

makeButtonDisable(startBtn);

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

    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      makeButtonAble(startBtn);

      startBtn.addEventListener('click', () => {
        makeButtonDisable(startBtn);

        timerId = setInterval(() => {
          let difference = selectedDates[0].getTime() - new Date().getTime();

          if (difference <= 0) {
            clearInterval(timerId);
            console.log('timer is over');
          } else {
            days.textContent = addLeadingZero(convertMs(difference).days);
            hours.textContent = addLeadingZero(convertMs(difference).hours);
            minutes.textContent = addLeadingZero(convertMs(difference).minutes);
            seconds.textContent = addLeadingZero(convertMs(difference).seconds);
          }
        }, 1000);
      });
    }
  },
};

flatpickr('#datetime-picker', options, {});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
