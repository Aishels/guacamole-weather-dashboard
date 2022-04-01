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
// console.log(currentDate);

// clear history

// search button click listener
searchCityButton.on("click", function(event){
    event.preventDefault();

    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue);
    searchHistory(searchValue);
    searchCityInput.val("");
})

// api based on user input
function currentConditionsRequest(searchValue) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + APIkey;
    
}




function initalizeHistory() {
    if(localStorage.getItem("cities")) {
        cityList = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cityList.length - 1;
        console.log(cityList);
    }
}