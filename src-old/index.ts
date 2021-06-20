const startButton = document.getElementById("start");
const endButton = document.getElementById("end");
const resetButton = document.getElementById("reset");
const multiplyBy2 = document.getElementById("multiplyBy2");
let interval = null;
let i = 0;
let transformFn = (number) => number;
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
  }
});
multiplyBy2.addEventListener("click", () => {
  if (interval) {
    transformFn = (number) => number * 2;
  }
});
setInterval(() => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}, 60000);
