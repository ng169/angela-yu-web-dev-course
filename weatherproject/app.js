const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const queriedCity = req.body.cityName;
    const apiKey = "4953d4156e70e3e087e9e72a322e8fce";
    const unit = "metric";
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + queriedCity + "&units=" + unit + "&appid=" + apiKey;
    https.get(URL, function (respone) {
        respone.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + queriedCity + " is " + temp + " degree Celcius</h1>.");
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write('<img src="' + iconURL + '">');
            res.send();
        });

    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});


