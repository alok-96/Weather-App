const apiKey = "f97e99e14fdbe5aeec7f1f0df0285a85";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const city = document.querySelector(".search-bar");
const searchIcon = document.getElementById("search-icon");
const weatherImg = document.querySelector(".weather-img");
const errorMessage = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  console.log(data);
  if (data.message == "city not found") {
    errorMessage.classList.remove("hidden");
    document.querySelector(".weather-info").classList.add("hidden");
    document.querySelector(".weather-details").classList.add("hidden");
} else {
    document.querySelector(".weather-info").classList.remove("hidden");
    document.querySelector(".weather-details").classList.remove("hidden");
    errorMessage.classList.add("hidden");

    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".city-name").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind-speed").innerHTML = data.wind.speed + "km/h";
    if (data.weather[0].main == "Clouds") weatherImg.src = "assets/clouds.png";
    else if (data.weather[0].main == "Clear")
      weatherImg.src = "assets/clear.png";
    else if (data.weather[0].main == "Drizzle")
      weatherImg.src = "assets/drizzle.png";
    else if (data.weather[0].main == "Mist") weatherImg.src = "assets/mist.png";
    else if (data.weather[0].main == "Rain") weatherImg.src = "assets/rain.png";
    else if (data.weather[0].main == "Snow") weatherImg.src = "assets/snow.png";
  }
}

searchIcon.addEventListener("click", () => {
    checkWeather(city.value);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter")
  checkWeather(city.value);
});