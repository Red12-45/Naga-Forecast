const form = document.getElementById("weatherForm");
const weatherDataDiv = document.getElementById("weatherData");
const dimapurTempDiv = document.getElementById("dimapurTemp");
const kohimaTempDiv = document.getElementById("kohimaTemp");
const mokokchungTempDiv = document.getElementById("mokokchungTemp");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value;
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `city=${encodeURIComponent(city)}`,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        weatherDataDiv.textContent = data.error;
      } else {
        const temperature = data.temperature;
        const cityName = city.toLowerCase();

        if (cityName === "dimapur") {
          dimapurTempDiv.textContent = `${temperature}°C`;
        } else if (cityName === "kohima") {
          kohimaTempDiv.textContent = `${temperature}°C`;
        } else if (cityName === "mokokchung") {
          mokokchungTempDiv.textContent = `${temperature}°C`;
        }

        weatherDataDiv.innerHTML = `
          <h2>${city}</h2>
          <p>Temperature: ${temperature}°C</p>
         
        `;
      }
    })
    .catch((error) => {
      console.error(error);
      weatherDataDiv.textContent =
        "An error occurred while fetching weather data";
    });
});
