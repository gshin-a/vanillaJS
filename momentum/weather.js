const xhr = new XMLHttpRequest();
xhr.open("GET", ".env", true);
xhr.onload = function () {
  let apiKey = -1;
  if (xhr.status === 200) {
    const envVariables = parseEnvFile(xhr.responseText);
    // envVariables 객체를 사용하여 환경 변수에 접근할 수 있습니다.
    apiKey = envVariables.API_KEY;
    // 환경 변수를 사용하는 코드를 작성합니다.
    console.log("envVariables");
  } else {
    apiKey = API_KEY;
    console.log("API_KEY");
  }
  function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const city = document.querySelector("#weather span:first-child");
        const weather = document.querySelector("#weather span:nth-child(2)");
        const temp = document.querySelector("#weather span:last-child");
        city.innerText = `${data.name} .`;
        weather.innerText = `${data.weather[0].main} .`;
        temp.innerText = `${Math.round(data.main.temp - 273.15)}°C`;
      });
  }
  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }

  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
};
xhr.send();

// .env 파일의 내용을 파싱하여 객체로 반환하는 함수
function parseEnvFile(envFileContent) {
  const envVariables = {};
  const lines = envFileContent.split("\n");
  for (const line of lines) {
    const [key, value] = line.replace("\r", "").split("=");
    envVariables[key.trim()] = String(value).trim();
  }
  return envVariables;
}
