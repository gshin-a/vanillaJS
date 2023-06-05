const clockContainer = document.querySelector("#clock"),
  clockTitle = clockContainer.querySelector("h1");

function getClock() {
  const date = new Date();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
}

function init() {
  setInterval(getClock, 1000);
}

init();
