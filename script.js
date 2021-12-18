var searchBtn = document.getElementById('search-button');
var cityName = document.getElementById('city-name');
var cityEl = document.getElementById('city');
var temperatureEl = document.getElementById("temperature");
var windSpeedEl = document.getElementById("wind-speed");
var humidityEl = document.getElementById("humidity");
var uviEl = document.getElementById("uvi");
var searchHistory = document.getElementById("search-history");
var parentContainer = document.getElementById("parent-container");
var days = "5";


// Creating the 5-Day Forecast
function makeContainer(day, temp, humidity, wind, uv) {
  return `<div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Day: ${day}</li>
    <li class="list-group-item">Temperature: ${temp}</li>
    <li class="list-group-item">Humidity: ${humidity}</li>
    <li class="list-group-item">Wind Speed: ${wind}</li>
    <li class="list-group-item">UV Index: ${uv}</li>
  </ul>
</div>`
};

// Getting current date
function createDate(time) {
  var milliseconds = time * 1000
  var dataObject = new Date(milliseconds)
  actualDate = dataObject.toLocaleString()
  return actualDate
};

// API Call for Current Weather (including lon & lat data)
function getLocation() {
  var searchCity = cityName.value
  console.log(searchCity)
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=538ed13f02e5d219c8e772c473392370&units=imperial`
  event.preventDefault()

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else console.log(error);
    })
    .then(function (data) {
      getWeather(data.coord.lon, data.coord.lat)
    })
    .catch(function (error) {
      console.log(error)
    });
  ;
};

// OneCall API (utilizing lon & lat)
function getWeather(lon, lat) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;
  var searchCity = cityName.value
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else console.log(error);
    })
    .then(function (data) {
      console.log(data)
      var unixTime = data.current.dt;
      createDate(unixTime);
      cityEl.textContent = `City: ${searchCity} ${actualDate}`;
      temperatureEl.textContent = `Temperature: ${data.daily[0].temp.day}°F`
      windSpeedEl.textContent = `Wind Speed: ${data.daily[0].wind_speed}mph`
      humidityEl.textContent = `Humidity: ${data.daily[0].humidity}`
      uviEl.textContent = `UV Index: ${data.daily[0].uvi}`

      var html = "";
      for (let i = 1; i <= days; i++) {
        html += makeContainer(i, Math.floor(data.daily[i].temp.day), data.daily[i].humidity, data.daily[i].wind_speed, data.daily[i].uvi)
      }
      parentContainer.innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
  ;
};
  
searchBtn.addEventListener('click', getLocation);
