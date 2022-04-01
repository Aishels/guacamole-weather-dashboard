var searchHistoryList = $("#search-history-list");
var searchCityInput = $("search-city");
var searchCityButton = $("search-city-button");
var clearHistoryButton = $("#clear-history");

var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("current-humidity");
var currentWindSpeed = $("current-wind-speed");
var UVindex = $("#uv-index");

var weatherContent = $("#weather-content");

// api key for openweather
var APIkey = "a626c658552f289834580d6d2e3d0bb6";
    console.log(APIkey);

// access to data
var cityList = [];

// current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate +")");
    console.log(currentDate);

