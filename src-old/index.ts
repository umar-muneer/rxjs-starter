const startButton = document.getElementById("start");
const endButton = document.getElementById("end");
const resetButton = document.getElementById("reset");
const multiplyBy2 = document.getElementById("multiplyBy2");
const toggleEven = document.getElementById("toggle-even");
const toggleOdd = document.getElementById("toggle-odd");
let interval = null;
let i = 0;
let transformFn = (number) => number;
let evenFilterFn = null;
let oddFilterFn = null;
startButton.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    i = transformFn(i + 1);
    document.getElementById("numbers").textContent = i.toString();
    if (evenFilterFn && evenFilterFn(i)) {
      document.getElementById("even-numbers").textContent = i.toString();
    }
    if (oddFilterFn && oddFilterFn(i)) {
      document.getElementById("odd-numbers").textContent = i.toString();
    }
  }, 1000);
});
endButton.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
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
    evenFilterFn = (number) => number % 2 === 0;
  } else {
    document.getElementById("even-numbers").classList.add("hide");
    oddFilterFn = null;
  }
});
toggleOdd.addEventListener("click", (event: any) => {
  if (event.currentTarget.checked) {
    document.getElementById("odd-numbers").classList.remove("hide");
    oddFilterFn = (number) => number % 2 !== 0;
  } else {
    document.getElementById("odd-numbers").classList.add("hide");
    oddFilterFn = null;
  }
});
setInterval(() => {
  if (interval) {
    clearInterval(interval);
  }
}, 60000);
