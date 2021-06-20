const startButton = document.getElementById("start");
const endButton = document.getElementById("end");
const resetButton = document.getElementById("reset");
let interval = null;
let i = 0;
startButton.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    i += 1;
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
    i = 0;
  }
});
setInterval(() => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}, 60000);
