var searchForm = document.querySelector('#search-form');
var formEl = document.querySelector('.form');
var formInput = document.querySelector('.form-input');
var searchBtn = document.getElementById('search-button');

var temperature = document.getElementById("temperature");
var windSpeed = document.getElementById("windSpeed");
var humidity = document.getElementById("humidity");
var uvi = document.getElementById("uvi");

var searchCity = formInput.value.trim()

// API Call for Current Weather (including lon & lat data)
function getLocation() {
  var searchCity = formInput.value
  console.log(searchCity)
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=538ed13f02e5d219c8e772c473392370&units=imperial`
  event.preventDefault()

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else console.log(error);
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

// OneCall API (utilizing lon & lat)
function getWeather(lon, lat) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;
  var searchCity = formInput.value
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else console.log(error);
    })
    .then(function (data) {
      getForecast(data, searchCity);
      console.log(data)
      var h1EL = document.createElement("h1") 
      h1EL.textContent = searchCity
      var todaySection = document.querySelector('#today')
      todaySection.append(h1EL)

      var tempEl = document.createElement("p")  
      tempEl.textContent = (`Temp: ${data.current.temp}°F`);
      console.log(tempEl);   
      h1EL.append(tempEl);

      var windEl = document.createElement("p")  
      windEl.textContent = (`Wind Speed: ${data.current.wind_speed}mph`);
      console.log(windEl);   
      tempEl.append(windEl);

      var humEl = document.createElement("p")  
      humEl.textContent = (`Humidity: ${data.current.humidity}%`);
      console.log(humEl);   
      windEl.append(humEl);

      var uvIndexEl = document.createElement("p")  
      uvIndexEl.textContent = (`UVI: ${data.current.uvi}`);
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
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=538ed13f02e5d219c8e772c473392370`;
  console.log(apiUrl)

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else console.log(error);
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        
      }
      // create and append into second section same as above

      console.log(data)
      // showForecast(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  ;
}

function displayWeather(data) {
  var temp = document.createElement('p')
  temperature.innerHTML = "";
  temp.textContent = `${data.main.temp}`
  temperature.appendChild(temp)

  var wind = document.createElement('p')
  windSpeed.innerHTML = "";
  wind.textContent = `${data.wind.speed}`
  windSpeed.appendChild(wind)

  var hum = document.createElement('p')
  humidity.innerHTML = "";
  wind.textContent = `${data.main.humidity}`
  humidity.appendChild(hum)
  
  var uvi = document.createElement('p')
  uvIndexEl.innerHTML = "";
  uvi.textContent = `${data.current.uvi}`
  uvIndexEl.appendChild(uvi)

}
  



// function displayImg (data) {
//   var createImage = document.createElement('img')
//   createImage.src = data.data[0].images.original.url;
//   results.appendChild(createImage)

// }

searchBtn.addEventListener('click', getLocation);





