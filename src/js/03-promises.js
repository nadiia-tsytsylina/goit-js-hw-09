import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector('input[name = delay]');
const step = document.querySelector('input[name = step]');
const amount = document.querySelector('input[name = amount]');
const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let delayNum = Number(delay.value);
  let stepNum = Number(step.value);
  let amountNum = Number(amount.value);

  for (let i = 1; i <= amountNum; i += 1) {
    createPromise(i, delayNum)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delayNum += stepNum;
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
