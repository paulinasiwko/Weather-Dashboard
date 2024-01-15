const apiKey = "0035747fb63db4ee901355f8cefff5f0";

$("#search-button").on("click", function(e) {
    e.preventDefault();
    $("#today").empty();
    $("#forecast").empty();

    const cityName = $("#search-input").val().trim();

    const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit&appid=${apiKey}`;

    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            const lat = data[0].lat;
            const lon = data[0].lon;
            
            forecast(lon, lat);
        });

});



function forecast(lon, lat) {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(forecastURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {

        const currentCity = data.city.name;
        const currentDate =  dayjs(data.list[0].dt_txt).format("DD/MM/YYYY");
        const currentTemp = (data.list[0].main.temp - 272.15).toFixed(2);
        const currentWind = data.list[0].wind.speed;
        const currentHumidity = data.list[0].main.humidity;
        const currentIconCode = data.list[0].weather[0].icon;
        const currentIconUrl = `http://openweathermap.org/img/w/${currentIconCode}.png`;
        
        const currentCard = $("<div>").addClass("card");
        const currentCardBody = $("<div>").addClass("card-body");
        const currentCityPlace = $("<h3>").addClass("bold").text(currentCity);
        const currentDatePlace = $("<h3>").addClass("bold").text(currentDate);
        const currentIconPlace = $("<img>").attr("src", currentIconUrl);
        const currentTempPlace = $("<p>").text("Temp: " + currentTemp + "°C");
        const currentWindPlace = $("<p>").text("Wind: " + currentWind + " KPH");
        const currentHumidityPlace = $("<p>").text("Humidity: " + currentHumidity + "%");

        $("#today").append(currentCard);
        $(currentCard).append(currentCardBody);
        $(currentCityPlace).append(currentDatePlace, currentIconPlace);
        $(currentCardBody).append(currentCityPlace, currentTempPlace, currentWindPlace, currentHumidityPlace);

        for(let i = 7; i < 40; i += 8) {
            const date =  dayjs(data.list[i].dt_txt).format("DD/MM/YYYY");
            const temp = (data.list[i].main.temp - 272.15).toFixed(2);
            const wind = data.list[i].wind.speed;
            const humidity = data.list[i].main.humidity;
            const iconCode = data.list[i].weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;   
            
            const card = $("<div>").addClass("card col-sm-2 futureDays");
            const cardBody = $("<div>").addClass("card-body");
            const datePlace = $("<h6>").addClass("dateStyle").text(date);
            const iconPlace = $("<img>").attr("src", iconUrl);
            const tempPlace = $("<p>").text("Temp: " + temp + "°C");
            const windPlace = $("<p>").text("Wind: " + wind + " KPH");
            const humidityPlace = $("<p>").text("Humidity: " + humidity + "%");

            $("#forecast").append(card);
            $(card).append(cardBody);
            $(cardBody).append(datePlace, iconPlace, tempPlace, windPlace, humidityPlace);
        }

    });
}

