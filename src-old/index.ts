const startButton = document.getElementById("start");
const endButton = document.getElementById("end");
const resetButton = document.getElementById("reset");
const multiplyBy2 = document.getElementById("multiplyBy2");
const toggleEven = document.getElementById("toggle-even");
const toggleOdd = document.getElementById("toggle-odd");
let interval = null;
let i = 0;
let transformFn = (number) => number;
let evenFn = null;
let oddFn = null;
startButton.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    i = transformFn(i + 1);
    document.getElementById("numbers").textContent = i.toString();
    if (evenFn && evenFn(i)) {
      document.getElementById("even-numbers").textContent = i.toString();
    }
    if (oddFn && oddFn(i)) {
      document.getElementById("odd-numbers").textContent = i.toString();
    }
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
    evenFn = (number) => number % 2 === 0;
  } else {
    document.getElementById("even-numbers").classList.add("hide");
    evenFn = null;
  }
});
toggleOdd.addEventListener("click", (event: any) => {
  if (event.currentTarget.checked) {
    document.getElementById("odd-numbers").classList.remove("hide");
    oddFn = (number) => number % 2 !== 0;
  } else {
    document.getElementById("odd-numbers").classList.add("hide");
    oddFn = null;
  }
});
setInterval(() => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}, 60000);
