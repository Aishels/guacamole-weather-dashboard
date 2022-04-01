// global variables
var apiKey = "a626c658552f289834580d6d2e3d0bb6";
var savedSearches = [];

var searchHistoryList = function(cityName) {
    $('.past-search:content("' + cityName + '")').remove();


}

var currentWeatherSection = function(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // longitude and latitude
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
                .then(function(response) {
                    return response.json();
            })
                .then(function(response){
                    searchHistoryList(cityName);
                    
                })
        })
}


$("#search-form").on("submit", function() {
    event.preventDefault();
    
    var cityName = $("#search-input").val();

    if (cityName === "" || cityName == null) {
        alert("Please enter name of city.");
        event.preventDefault();
    } else {
        currentWeatherSection(cityName);
        fiveDayForecastSection(cityName);
    }
});


// $("#search-history-container").on("click", "p", function() {
//     var previousCityName = $(this).text();
//     currentWeatherSection(previousCityName);
    
// })