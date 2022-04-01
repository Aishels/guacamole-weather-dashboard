// global variables
var apiKey = "a626c658552f289834580d6d2e3d0bb6";
var savedSearches = [];

var searchHistoryList = function(cityName) {
    $('.past-search:contains("' + cityName + '")').remove();

    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(cityName);

    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");

    searchEntryContainer.append(searchHistoryEntry);

    var searchHistoryContainerEl = $("#search-history-container");
    searchHistoryContainerEl.append(searchEntryContainer);

    if (savedSearches.length > 0){
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }

    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

    $("#search-input").val("");

};

var loadSearchHistory = function() {
    var savedSearchHistory = localStorage.getItem("savedSearches");

    if (!savedSearchHistory) {
        return false;
    }

    savedSearchHistory = JSON.parse(savedSearchHistory);

    for (var i = 0; i < savedSearchHistory.length; i++) {
        searchHistoryList(savedSearchHistory[i]);
    }
};

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
                    
                    var currentWeatherContainer = $("#current-weather-container");
                    currentWeatherContainer.addClass("current-weather-container");

                    var currentTitle = $("current-title");
                    var currentDay = moment().format("M/D/YYYY");
                    currentTitle.text(`${cityName} (${currentDay})`);
                    var currentIcon = $("#current-weather-icon");
                    currentIcon.addClass("current-weather-icon");
                    var currentIconCode = response.current.weather[0].icon;
                    currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

                    var currentTemperature = $("#current-temperature");
                    currentTemperature.text("Temperature: " + response.current.temp + " \u00B0F");
                    console.log(response.current.temp);

                    var currentHumidity = $("#current-humidity");
                    currentHumidity.text("Humidity: " + response.current.humidity + "%");
                    console.log(response.current.humidity);

                    var currentWindSpeed = $("current-wind-speed");
                    currentWindSpeed.text("Wind Speed: " + response.current.wind_speed + " MPH");
                    console.log(response.current.wind_speed);

                    var currentUvIndex = $("#current-uv-index");
                    currentUvIndex.text("UV Index: ");
                    var currentNumber = $("#current-number");
                    currentNumber.text(response.current.uvi);
                    console.log(response.current.uvi);



                    // if (response.current.uvi <= 2) {
                    //     currentNumber.addClass("favorable");
                    // } else if (response.current.uvi >= 3 && response.current.uvi <= 7) {
                    //     currentNumber.addClass("moderate");
                    // } else {
                    //     currentNumber.addClass("severe");
                    // }
                    
                })
        })
        .catch(function(err) {
            $("search-input").val("");
            
            alert("We could not find the city you searched for. Try searching for a valid city.");
        });
};




$("#search-form").on("submit", function() {
    event.preventDefault();
    
    var cityName = $("#search-input").val();

    if (cityName === "" || cityName == null) {
        alert("Please enter name of city.");
        event.preventDefault();
    } else {
        currentWeatherSection(cityName);
        // fiveDayForecastSection(cityName);
    }
});


// $("#search-history-container").on("click", "p", function() {
//     var previousCityName = $(this).text();
//     currentWeatherSection(previousCityName);
    
// })