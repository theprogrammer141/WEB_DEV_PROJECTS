document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "abcd";
  const URL =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const temperature = document.querySelector(".temperature");
  const cityName = document.querySelector(".city");
  const humidityValue = document.querySelector(".humidity-value");
  const windValue = document.querySelector(".wind-value");
  const weatherImage = document.querySelector(".weather img");

  async function checkWeather(city) {
    const response = await fetch(URL + city + `&appid=${apiKey}`);
    var data = await response.json();
    const errorMessage = document.querySelector(".error-message");

    // console.log(data);
    if (data.cod == 404) {
      errorMessage.style.display = "block";
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".details").style.display = "none";
    } else {
      errorMessage.style.display = "none";
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".details").style.display = "flex";
      cityName.innerHTML = data.name;
      temperature.innerHTML = Math.round(data.main.temp) + "°C";
      humidityValue.innerHTML = data.main.humidity + "%";
      windValue.innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clear") {
        weatherImage.src = "./images/clear.png";
      } else if (data.weather[0].main == "Clouds") {
        weatherImage.src = "./images/clouds.png";
      } else if (data.weather[0].main == "drizzle") {
        weatherImage.src = "./images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherImage.src = "./images/mist.png";
      } else if (data.weather[0].main == "Rain") {
        weatherImage.src = "./images/rain.png";
      } else if (data.weather[0].main == "Snow") {
        weatherImage.src = "./images/snow.png";
      }
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });
});
