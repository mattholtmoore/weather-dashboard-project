// Declared variables
var searchBtn = document.getElementById('search-button');
var cityName = document.getElementById('city-name');
var cityEl = document.getElementById('city');
var temperatureEl = document.getElementById("temperature");
var windSpeedEl = document.getElementById("wind-speed");
var humidityEl = document.getElementById("humidity");
var uviEl = document.getElementById("uvi");
var searchHistory = document.querySelector("#search-history");
var parentContainer = document.getElementById("parent-container");
var days = "5";


init();
// Returning previous search on refresh
function init () {
  showCity();
};

// Creating the 5-Day Forecast
function makeContainer(day, temp, humidity, wind, uv) {
  return `<div class="card forecast mx-2" style="width: 18rem;">
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

// Saves to local storage
function saveCity(data) {
  event.preventDefault;
  var storedResults = JSON.parse(localStorage.getItem('prevCity'));
  if (storedResults === null) {
    var selectedCity = [data]
    localStorage.setItem('prevCity', JSON.stringify(selectedCity))
    addResult(data);
    return
  };
  storedResults.push(data)
  localStorage.setItem('prevCity', JSON.stringify(storedResults));
  addResult(data);
};

// Makes all the previous search city buttons
function showCity(data) {
  var storedResults = JSON.parse(localStorage.getItem('prevCity'));
  if (storedResults != undefined || storedResults != null) {
    for (let i = 0; i < storedResults.length; i++) {
      searchHistory.innerHTML += `<button class="btn btn-primary m-1 prevResult" id='prevBtn' type="submit" value="${storedResults[i]}">${storedResults[i]}</button>`
    }
  }
  researchBtn();
};

// API Call for Current Weather (including lon & lat data)
function getLocation(data) {
  searchCity = data;
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=538ed13f02e5d219c8e772c473392370&units=imperial`
  event.preventDefault()

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else console.log(err);
    })
    .then(function (data) {
      getWeather(data.coord.lon, data.coord.lat)
    })
    .catch(function (err) {
      console.log(err)
    });
  ;
};

// OneCall API (utilizing lon & lat)
function getWeather(lon, lat) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else console.log(err);
    })
    .then(function (data) {
      var unixTime = data.current.dt;
      createDate(unixTime);
      cityEl.textContent = `City: ${searchCity} ${actualDate}`;
      temperatureEl.textContent = `Temperature: ${data.daily[0].temp.day}°F`
      windSpeedEl.textContent = `Wind Speed: ${data.daily[0].wind_speed}mph`
      humidityEl.textContent = `Humidity: ${data.daily[0].humidity}`
      uviEl.textContent = `UV Index: ${data.daily[0].uvi}`

      if (data.daily[0].uvi <= 2) {
        uviEl.style.color = "green";
      }
      if (data.daily[0].uvi > 2 && data.daily[0].uvi <= 7) {
        uviEl.style.color = "orange";
      }
      if (data.daily[0].uvi > 7) {
        uviEl.style.color = "red";
      }

      var html = "";
      for (let i = 1; i <= days; i++) {
        html += makeContainer(i, Math.floor(data.daily[i].temp.day), data.daily[i].humidity, data.daily[i].wind_speed, data.daily[i].uvi)
      }
      parentContainer.innerHTML = html;
    })
    .catch(function (err) {
      console.log(err);
    });
  ;
};

// Main search event listener
searchBtn.addEventListener('click', function () {
  var searchCity = cityName.value;
  getLocation(searchCity);
  saveCity(searchCity);
});

// Previous searches event listener
function researchBtn() {
  searchHistory.addEventListener('click', function (event) {
    getLocation(event.target.value);
  });
};

// Making the button for when searching for a city
function addResult(city) {
  searchHistory.innerHTML += `<button class="btn btn-primary m-1 prevResult" id='prevBtn' type="submit" value="${city}">${city}</button>`
};
