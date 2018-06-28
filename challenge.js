const display = document.querySelector(".example");
const answer = document.querySelector(".answer");
const score = document.querySelector("#score");

function startCount() {
  let number1 = Math.round(Math.random()*100);
  let number2 = Math.round(Math.random()*100);
  display.value = `${number1} + ${number2}`;
}

function resultCheck(ke) {
  const key = ke.key;

  if ("0123456789".includes(key)) {
    (answer === document.activeElement) 
    ? answer.value = answer.value
    : answer.value += key;
  }

  if (["Backspace", "Delete"].includes(key)) {
    (answer === document.activeElement) 
    ? answer.value = answer.value
    : answer.value = answer.value.slice(this.length, -1);
  }

  if (["Enter"].includes(key)) {
    const points = parseInt(score.textContent);

    (eval(display.value) === parseInt(answer.value))
    ? score.textContent = points + 1
    : score.textContent = points - 2;
    answer.value = "";
    startCount();
  }
}
document.addEventListener("keydown", resultCheck);
// document.addEventListener("click", (e) => {console.log(e)});

(function() {
  startCount();
})();
