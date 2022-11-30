$(document).ready(function () {
    var city = "";

    var lat = "";
    var lon = "";
    function getWeatherOneAPI(a,b) {
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            $(".card-deck").empty();
            var icon = response.current.weather[0].icon;
            var iconImg = $("<img>");
            iconImg.addClass("img-fluid");
            iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
            $("#city").append(iconImg);
            $("#temp").text("Temp: " + response.current.temp + "° F");
            $("#humidity").text("Humidity: " + response.current.humidity + "%");
            $("#wind").text("Wind: " + response.current.wind_speed + " MPH");
            $("#current").css({"display":"block"});
            var daily = response.daily;
            for (i = 1; i < daily.length; i++) {
                var dDate = moment.unix(daily[i].dt).format("ddd MM/DD");
                var dTemp = daily[i].temp.day;
                var dHum = daily[i].humidity;
                var dIcon = daily[i].weather[0].icon;
                var dDiv = $("<div class='card text-white bg-primary'>")
                var pTemp = $("<p>");
                var pHum = $("<p>");
                var imgIcon = $("<img>");
                var hDate = $("<h6>");
                hDate.text(dDate);
                imgIcon.attr("src", "https://openweathermap.org/img/wn/" + dIcon + "@2x.png")
                imgIcon.addClass("img-fluid");
                imgIcon.css({"width": "100%"});
                pTemp.text("Temp: " + dTemp + "° F");
                pHum.text("Humidity: " + dHum + "%");
                dDiv.append(hDate);
                dDiv.append(imgIcon);
                dDiv.append(pTemp);
                dDiv.append(pHum);
                $(".card-deck").append(dDiv);
                $("#five-day").css({"display":"block"});
            }
        })
    }
    function getWeather() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=en&appid=aec299195260a001b09706b5bfe740f7";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            lat = response.coord.lat;
            lon = response.coord.lon;
            $("#city").text(response.name);
            $("#date").text(moment.unix(response.dt).format("dddd, MM/DD/YYYY"));
            localStorage.setItem("city", response.name);
            getWeatherOneAPI(lat,lon);
        })
    }
    function init(){
        city = localStorage.getItem("city");
        if (city !== null) {
            var cityList = $("<button>");
            cityList.addClass("list-group-item list-group-item-action");
            cityList.text(city);
            $("ul").prepend(cityList);
            getWeather()
        }
    }
    function searchButton() {
        city = $("input").val().trim();
        var cityList = $("<button>");
        cityList.addClass("list-group-item list-group-item-action");
        cityList.text(city);
        $("ul").prepend(cityList);
        $("input").val("");
        getWeather();
    }
    init();
    $("#city-form").submit(function (event) {
        event.preventDefault();
        searchButton();
    })
    $("#form-submit").click(function (event) {
        event.preventDefault();
        searchButton();
    })
    $("ul").on("click", "button", function () {
        city = $(this).text();
        getWeather();
    })
      });