const noficationsElement = document.querySelector(".notificattions");
const iconeElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const tempDescription = document.querySelector(".temperature-description p");
const locatonElement = document.querySelector(".location p");
const KELVIN = 273;
const key = "f93432a3be8eb1e705fc56e0c33e107b";

const weather = {
  temperatura: {
    value: 18,
    unit: "Celsius",
  },
  description: "",
  iconId: "01d",
  cidade: "",
  country: "ES",
};

const setPosition = (position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
};
function showError(error) {
  noficationsElement.style.display = "block";
  noficationsElement.innerHTML = `<p> ${error.message} </p>`;
}
const getWeather = (latitude, longitude) => {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      console.log(data);
      return data;
    })
    .then(function (data) {
      weather.temperatura.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.cidade = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      weatherDiplay();
    });
};
const weatherDiplay = () => {
  iconeElement.innerHTML = `<img src='icons/${weather.iconId}.png'/>`;
  tempElement.innerHTML = `${weather.temperatura.value} ° <span>C</span>`;
  tempDescription.innerHTML = `${weather.description}`;
  locatonElement.innerHTML = `${weather.cidade},${weather.country}`;
};
function calculofahrenheit(temperatura) {
  return (temperatura * 9) / 5 + 32;
}
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  noficationsElement.innerHTML = "<p>Seu Browser não suporta GeoLocation";
}

tempElement.addEventListener("click", () => {
  if (weather.temperatura.unit === undefined) return;
  if (weather.temperatura.unit === "Celsius") {
    let fahrenheit = calculofahrenheit(weather.temperatura.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = `${fahrenheit}° <span> F </span>`;
    weather.temperatura.unit = fahrenheit;
  } else {
    tempElement.innerHTML = `${weather.temperatura.value}° <span> C </span>`;
    weather.temperatura.unit = "Celsius";
  }
});
weatherDiplay();
