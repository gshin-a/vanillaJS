const clockContainer = document.querySelector("#clock"),
  clockTitle = clockContainer.querySelector("h1"),
  hour = document.querySelector("#hour"),
  minute = document.querySelector("#minute"),
  second = document.querySelector("#second");

function getClock() {
  const date = new Date();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
  const hourDeg =
    date.getHours() >= 12
      ? (date.getHours() - 15) * 30
      : (date.getHours() - 3) * 30;
  hour.style.transform = `rotate(${hourDeg}deg)`;
  const minuteDeg = (date.getMinutes() - 15) * 6;
  minute.style.transform = `rotate(${minuteDeg}deg)`;
  const secondDeg = (date.getSeconds() - 15) * 6;
  second.style.transform = `rotate(${secondDeg}deg)`;
}

function init() {
  setInterval(getClock, 1000);
}

init();
