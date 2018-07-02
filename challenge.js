const display = document.querySelector(".example"),
      answer  = document.querySelector(".answer"),
      score   = document.querySelector("#score"),
      start   = document.querySelector(".start");
let   timer   = 30;

// pretend to be main field function
function startCount() {
  let   min = 1,
        max = 99,
        number1 = Math.round(Math.random() * (max-min) + min),
        number2 = Math.round(Math.random() * (max-min) + min);
  const sign = ["+", "-"],
        rand = sign[Math.floor(Math.random() * sign.length)];

  display.value = `${number1} ${rand} ${number2}`;
}

(() => {startCount()})(); //math example iife

// input/check answer
function resultCheck(ke) {
  const key = ke.key;

  if(/^[-\d]$/.test(key)) {
    answer.value += key;
  }

  if(["Backspace", "Delete"].includes(key)) {
    answer.value = answer.value.slice(this.length, -1);
  }

  if(["Enter"].includes(key)) {
    points = parseInt(score.textContent);

    eval(display.value) === parseInt(answer.value)
      ? score.textContent = points + 1
      : score.textContent = points - 2;

    answer.value = "";
    startCount();
  }

  if(/[sS]/.test(key)) {
    start.onclick();
  }
}
document.addEventListener("keydown", resultCheck);

// start timer

start.onclick = function timerStart() {
  document.querySelector(".timer").textContent = timer;

  if (timer < 0) {
      alert("Time's UP!");
      timer = 30;
      score.textContent = "0";
  }
  else {
      setTimeout(timerStart, 1000);
      --timer;
  }
}

// document.addEventListener("keypress", (e) => {console.log(e)});
