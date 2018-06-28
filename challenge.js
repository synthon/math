function startPrimer() {
  let number1 = Math.round(Math.random()*100);
  let number2 = Math.round(Math.random()*100);
  document.querySelector(".example").value = `${number1} + ${number2}`;
}

function resultCheck(ke) {
  const display = document.querySelector(".example").value;
  const answer = document.querySelector(".answer");
  const score = document.querySelector("#score");
  const key = ke.key;
  if ("0123456789".includes(key)) {
    answer.value += key;
  }
  if (["Backspace", "Delete"].includes(key)) {
    answer.value = answer.value.slice(this.length, -1);
  }
  if (["Enter"].includes(key)) {
    let points = parseInt(score.textContent);

    (eval(display) === parseInt(answer.value))
    ? score.textContent = points + 1
    : score.textContent = points - 2;
    answer.value = "";
    startPrimer();
  }
}
document.addEventListener("keydown", resultCheck);
// document.addEventListener("click", (e) => {console.log(e)});

(function() {
  startPrimer();
})();
