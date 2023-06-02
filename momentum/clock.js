const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function refactorDate(time) {
  return time < 10 ? `0${time}` : time;
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${refactorDate(hours)}:${refactorDate(
    minutes
  )}:${refactorDate(seconds)}`;
}

function init() {
  setInterval(getTime, 1000);
}

init();
