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
        rangeMax = document.querySelector("#mm-range-max").valueAsNumber,
        checked = document.querySelectorAll("input[name=math]:checked"),
        digits = document.querySelector("input[name=digits]:checked"),
        range = document.getElementsByName("range");

  let sign = [];
  checked.forEach((e) => {sign.push(e.value)});

  let rand = sign[Math.floor(Math.random() * sign.length)],
      singleDigitsOne = Math.round(Math.random() * 8 + 1),
      singleDigitsTwo = Math.round(Math.random() * 8 + 1),
      expression = `${singleDigitsOne} ${rand} ${singleDigitsTwo}`;
  const appropriate = eval(expression) >= rangeMin && eval(expression) <= rangeMax,
        rem = singleDigitsOne % singleDigitsTwo === 0;

      if (appropriate) {
        /********************
         * Single digits
         ********************/
        if (parseInt(digits.value) === 1) {
          // range.forEach((e) => {e.max = "9"});
          if (rand === "/") {
            rem ? display.value = expression : startCount();
          } else {
            display.value = expression;
          }
        }

        /********************
         * Double digits
         ********************/
        if (parseInt(digits.value) === 2) {
          return display.value = expression;
        }

         /********************
         * Triple digits
         ********************/
        if (parseInt(digits.value) === 3) {
          return display.value = expression;
        }

      } else {
        startCount();
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
