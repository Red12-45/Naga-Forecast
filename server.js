const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const constants = {
  OpenWeatherMap: {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "ae7d44920a87282e83642545b6682ed9",
  },
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", (req, res) => {
  const city = req.body.city;
  const apiKey = constants.OpenWeatherMap.SECRET_KEY;
  const url = `${constants.OpenWeatherMap.BASE_URL}${city}&appid=${apiKey}&units=metric`;

  axios
    .get(url)
    .then((response) => {
      const temperature = response.data.main.temp;
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      res.send({ temperature, date });
    })
    .catch((error) => {
      console.error(error);
      res.send({ error: "Failed to fetch weather data" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
