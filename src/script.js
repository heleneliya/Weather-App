function startApplication() {
  function showTemperature(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#current-temp").innerHTML = Math.round(
      response.data.main.temp
    );
  }

  function searchCity(city) {
    let units = "metric";
    let apiKey = "1f3ca910a3d3d875156a68c2f0888f6e";
    let apiUrlStart = "https://api.openweathermap.org/data/2.5/weather?q=";
    let apiUrl = `${apiUrlStart}${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }

  function searchCurrentLocation(position) {
    let units = "metric";
    let apiKey = "1f3ca910a3d3d875156a68c2f0888f6e";
    let apiUrlStart = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiUrlStart}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
  }

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);

  let currentLocationButton = document.querySelector("button");
  currentLocationButton.addEventListener("click", getCurrentLocation);

  searchCity("Hackensack");
}

//city search & current time
function initializeApplication() {
  let now = new Date();
  let h2 = document.querySelector("h2");

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = "0" + now.getHours();
  }

  if (minutes < 10) {
    minutes = "0" + now.getMinutes();
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  h2.innerHTML = `${day} ${hours}:${minutes}`;

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", search);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let citySearch = document.querySelector("#city-input");
  cityElement.innerHTML = citySearch.value;
}

// document.onreadystatechange = function () {
//   if (document.readyState === "complete") {
//     initializeApplication();
//   }
// };
