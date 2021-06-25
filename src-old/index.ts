const startButton = document.getElementById("start");
const endButton = document.getElementById("end");
startButton.addEventListener("click", () => {
  let interval = null;
  let i = 0;
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
setInterval(() => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}, 60000);
