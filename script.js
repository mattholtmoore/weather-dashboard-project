var searchForm = document.querySelector('#search-form');
var formEl = document.querySelector('.form');
var formInput = document.querySelector('.form-input');
var searchBtn = document.getElementById('search-button');
var results = document.querySelector('results');
var searchCity = formInput.value.trim()

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
      // formInput.value = "";
    })
    .catch(function (error) {
      console.log(error)
    });
  ;
};

function getWeather(lon, lat) {
  var apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;
  var searchCity = formInput.value
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert('Error: ', response.error);
    })
    .then(function (data) {
      getForecast(data, searchCity);
      console.log(data)
      var h1EL = document.createElement("h1") 
      h1EL.textContent = searchCity
      var todaySection = document.querySelector('#today')
      todaySection.append(h1EL)

      var tempEl = document.createElement("p")  
      tempEl.textContent = ("Temp: " + data.current.temp);
      console.log(tempEl);   
      h1EL.append(tempEl);

      var windEl = document.createElement("p")  
      windEl.textContent = ("Wind Speed: " + data.current.wind_speed);
      console.log(windEl);   
      tempEl.append(windEl);

      var humEl = document.createElement("p")  
      humEl.textContent = ("Humidity: " + data.current.humidity);
      console.log(humEl);   
      windEl.append(humEl);

      var uvIndexEl = document.createElement("p")  
      uvIndexEl.textContent = ("UVI: " + data.current.uvi);
      console.log(uvIndexEl);   
      humEl.append(uvIndexEl);

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
  console.log(apiUrl)
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else console.log(error);
    })
    .then(function (data) {
      // create and append into second section same as above
      console.log(data)
      // showForecast(data);
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


