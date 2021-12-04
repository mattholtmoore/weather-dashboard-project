[] Need 3 API requests/endpoints (possibly 2 with One Call API) 
  [*] go to Open Weather Map site = https://openweathermap.org/api/one-call-api 
  [*] create an account 
  [*] create my own API Key (My API Key = 715ce75dce76cb472dd190a0db8b4e8b)
  [*] locate and copy One Call API call = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&units=imperial&appid={API key}
  [*] locate and copy 5 Day Forecast API call = https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


[] Need to get the **CURRENT** weather for searched city
  [] With resulting info from that city, I need to get the **UV Index**
    - use One Call API to acquire both of these items if possible
      - figure out how to get the latitude and longitude
  [] Need to get 5 Day Forecast 


[] Create an input field
  - need a search bar/button
  - tell API to take value from input field
  - search using that API (to give me back the information)
  - display info on the page
  - based on relationships, maybe look at lat & lon, search UV Index and 5 day forecast

[] In Javascript, I will need a way to call




