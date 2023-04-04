// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body>
// на случайное значение используя инлайн стиль.
// При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
// Учти, на кнопку «Start» можно нажать бесконечное количество раз.
// Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна(disabled).
// Для генерации случайного цвета используй функцию getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

const makeButtonDisable = btn => {
  btn.setAttribute('disabled', 'true');
  btn.classList.remove('active-btn');
};

const makeButtonAble = btn => {
  btn.removeAttribute('disabled');
  btn.classList.add('active-btn');
};

makeButtonDisable(stopBtn);
makeButtonAble(startBtn);

const onStartClick = () => {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  makeButtonDisable(startBtn);
  makeButtonAble(stopBtn);
};

const onStopClick = () => {
  clearInterval(intervalId);
  makeButtonDisable(stopBtn);
  makeButtonAble(startBtn);
};

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
