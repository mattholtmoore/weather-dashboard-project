var searchForm = document.querySelector('search-form');
var formEl = document.querySelector('form');
var formInput = document.querySelector('.form-input');
var searchBtn = document.getElementById('search-button');
var results = document.querySelector('results');

function getLocation() {
  var searchCity = formInput.value
  console.log(searchCity)
  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=538ed13f02e5d219c8e772c473392370&units=imperial`
  event.preventDefault()
  
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert('Error: ', response.error);
    })
    .then(function (data) {
      console.log(data)
      searchForm = data.name
      getWeather(data.coord.lon, data.coord.lat)
    })
    .catch(function (error) {
      console.log(error)
    });
  ;
};

function getWeather(lon, lat) {
  var apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert('Error: ', response.error);
    })
    .then(function (data) {
      getForecast(data);
      console.log(data)
    })
    .catch(function (error) {
      console.log(error);
    });
  ;
}

function getForecast() {
  var searchCity = formInput.value
  console.log(searchCity)
  var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=538ed13f02e5d219c8e772c473392370`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert('Error: ', response.error);
    })
    .then(function (data) {
      console.log(data)
      showForecast(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  ;
}


searchBtn.addEventListener('click', getLocation);



// Portioned below pulled from Activity 04-07 for reference.

// var secondTag = document.createElement(secondTagName);
// secondTag.textContent = "This is our second tag via prompts, it's a " + secondTagName + ".";
// document.body.appendChild(secondTag);


