import { transform } from "typescript";

const startButton = document.getElementById("start");
const endButton = document.getElementById("end");
const resetButton = document.getElementById("reset");
const multiplyBy2 = document.getElementById("multiplyBy2");
const toggleEven = document.getElementById("toggle-even");
const toggleOdd = document.getElementById("toggle-odd");
let interval = null;
let i = 0;
let evenState = 0;
let oddState = 0;
let transformFn = (number) => number;
let evenInterval = null;
let oddInterval = null;
startButton.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    i = transformFn(i + 1);
    document.getElementById("numbers").textContent = i.toString();
  }, 1000);
});
endButton.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
});
resetButton.addEventListener("click", () => {
  if (interval) {
    transformFn = (number) => number;
    i = 0;
    evenState = 0;
    oddState = 0;
  }
});
multiplyBy2.addEventListener("click", () => {
  if (interval) {
    transformFn = (number) => number * 2;
  }
});
toggleEven.addEventListener("click", (event: any) => {
  if (event.currentTarget.checked) {
    document.getElementById("even-numbers").classList.remove("hide");
    if (evenInterval) {
      clearInterval(evenInterval);
    }
    evenInterval = setInterval(() => {
      evenState = transformFn(evenState + 1);
      const isEven = evenState % 2 === 0;
      if (isEven) {
        document.getElementById("even-numbers").textContent =
          evenState.toString();
      }
    }, 1000);
  } else {
    document.getElementById("even-numbers").classList.add("hide");
    clearInterval(evenInterval);
  }
});
toggleOdd.addEventListener("click", (event: any) => {
  if (event.currentTarget.checked) {
    document.getElementById("odd-numbers").classList.remove("hide");
    if (oddInterval) {
      clearInterval(oddInterval);
    }
    oddInterval = setInterval(() => {
      evenState = transformFn(evenState + 1);
      const isOdd = oddState % 2 !== 0;
      if (isOdd) {
        document.getElementById("odd-numbers").textContent =
          oddState.toString();
      }
    }, 1000);
  } else {
    document.getElementById("odd-numbers").classList.add("hide");
  }
});
setInterval(() => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  if (evenInterval) {
    clearInterval(evenInterval);
    evenInterval = null;
  }
  if (oddInterval) {
    clearInterval(oddInterval);
    oddInterval = null;
  }
}, 60000);
