/********************
 *
 * Global vars
 *
********************/
const display = document.querySelector(".example"),
      answer = document.querySelector(".answer"),
      score = document.querySelector("#score"),
      start = document.querySelector(".start");

/********************
 *
 * Settings field
 *
********************/
function startCount() {
  const rangeMin = document.querySelector("#mm-range-min").valueAsNumber,
        rangeMax = document.querySelector("#mm-range-max").valueAsNumber;

  let min = rangeMin,
      max = rangeMax,
      number1 = Math.round(Math.random() * (max-min) + min),
      number2 = Math.round(Math.random() * (max-min) + min),
      checked = document.querySelectorAll("input[name=math]:checked"),
      sign = [];

  checked.forEach((e) => {sign.push(e.value)});

  let rand = sign[Math.floor(Math.random() * sign.length)];

  if (rand === "/") {
    if (number1 % number2 === 0) {
      display.value = `${number1} ${rand} ${number2}`;
    }
  } else {
    display.value = `${number1} ${rand} ${number2}`;
  }
}

/********************
 *
 * field iife
 *
********************/
(() => {startCount()})();

/********************
 *
 * input/check answer
 *
********************/
function resultCheck(ke) {
  const key = ke.key;

  if((/^[-\d]$/).test(key)) {
    answer.value += key;
  }

  if(["Backspace", "Delete"].includes(key)) {
    answer.value = answer.value.slice(this.length, -1);
  }

  if(["Enter"].includes(key)) {
    const points = parseInt(score.textContent);

    eval(display.value) === parseInt(answer.value)
      ? score.textContent = points + 1
      : score.textContent = points - 2;

    answer.value = "";
    startCount();
  }

  if((/^[sS]$/).test(key)) {
    start.onclick();
  }
}

/********************
 *
 * start timer
 *
********************/
let timer = 30;

start.onclick = function timerStart() {
  document.querySelector(".timer").textContent = timer;

  if (timer < 0) {
      alert("You got " + score.textContent + " points");
      timer = 30;
      score.textContent = "0";
  }
  else {
      setTimeout(timerStart, 1000);
      --timer;
  }
}

/********************
 *
 * listeners
 *
********************/
document.addEventListener("keydown", resultCheck);
document.addEventListener("keypress", (e) => {document.activeElement.blur(e)});
// document.addEventListener("click", (e) => {console.log(e)});
