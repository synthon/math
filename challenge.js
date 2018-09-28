"use strict";

/** Some global queries */
const example = document.querySelector(".example"), // example input
      timer = document.querySelector(".timer"), // timer value
      counter = document.querySelector(".start"), // start timer
      answer = document.querySelector(".answer"), // answer input
      points = document.querySelector("#score"), // point value
      apply = document.querySelector(".apply"); // apply button
let   tip = false, // timer in progress
      sqrt = false; // square root on/off

answer.focus();
/** Settings */
const settings = () => {
  const sign = document.querySelectorAll("input[name=math]:checked"), // sign choose
        chooseDigits = document.querySelector("input[name=digits]:checked").value, // Set. digits
        squareRoot = document.querySelector("#square-root").checked;
  let randSign = sign[Math.random() * sign.length >> 0], // get random sign
      randNumber1 = 0,
      randNumber2 = 0;
  answer.value = "";

  // random number generator
  if (chooseDigits == 1) {
    randNumber1 = Math.random() * 9 + 1 >> 0;
    randNumber2 = Math.random() * 9 + 1 >> 0;
  } else if (chooseDigits == 2) {
    randNumber1 = Math.random() * 90 + 10 >> 0;
    randNumber2 = Math.random() * 90 + 10 >> 0;
  } else {
    randNumber1 = Math.random() * 900 + 100 >> 0;
    randNumber2 = Math.random() * 900 + 100 >> 0;
  }

  // check if square root practice
  if (squareRoot) {
    sqrt = true;
    return {randNumber1, sqrt};
  }

  // check for division
  if (randSign && randSign.value === "/") {
    if (randNumber1 % randNumber2 !== 0) {
      return settings();
    }
  }

  return {randNumber1, randSign, randNumber2};
};


/** SMC field */
const SMC = class SMC {
  constructor(e) {
    if (e.sqrt) {
      this.square = e.randNumber1 * e.randNumber1;
    }
    if (e.randSign !== undefined) {
      this.fNumber = e.randNumber1;
      this.sNumber = e.randNumber2;
      this.rSign = e.randSign.value;
    }
  }

  static newExample(e) {
    if (e.rSign) {
      sqrt = false;
      example.value = `${e.fNumber} ${e.rSign} ${e.sNumber}`;
    } else if (e.square) {
      example.value = `${e.square}`;
    } else {
      example.value = `Meh..?!`;
    }
  }
};
const fieldLoad = () => SMC.newExample(new SMC(settings()));
fieldLoad();


/** Check your answer */
const answerCheck = (ke) => {
  const key = ke.key;

  if (/^[\-\d]$/.test(key)) answer.value += key;

  if (/^Backspace|Delete$/.test(key)) answer.value = answer.value.slice(0, -1);

  if (/^Enter$/.test(key)) {
    const score = parseInt(points.textContent);

    if (!sqrt && example.value !== "Meh..?!") {
      eval(example.value) === parseInt(answer.value)
        ? points.textContent = score + 1
        : points.textContent = score - 1;
    } else {
      Math.sqrt(example.value) === parseInt(answer.value)
        ? points.textContent = score + 1
        : points.textContent = score - 1;
    }

  answer.value = "";
  return fieldLoad();
  }

  if (/^[sS]$/.test(key) && !tip) countdown();
};


/** Timer */
const countdown = () => {
  let count = setInterval(down, 1000);
  tip = true;
  points.textContent = "0";
  answer.value = "";

  function down() {
    if (timer.textContent < 1) {
      clearInterval(count);
      tip = false;
      alert(`You got ${points.textContent} points!`);
      timer.textContent = 30;
    } else {
      --timer.textContent;
    }
  }
};


/** Start Timer */
counter.addEventListener("click", () => {if (!tip) countdown()}, {passive: true});


/** Apply button */
apply.addEventListener("click", fieldLoad, {passive: true});


/** KB Listener */
document.addEventListener("keydown", answerCheck, {passive: true});


/** Mouse Listener */
document.addEventListener("click", e => console.log(e), {passive: true});
