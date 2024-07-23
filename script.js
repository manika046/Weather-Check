document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "af04f68ada39fd3eadd5dad1222deee7";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".description").innerHTML = data.weather[0].description;
        } catch (error) {
            console.error("Error fetching the weather data: ", error);
            document.querySelector(".city").innerHTML = "City not found";
            document.querySelector(".temperature").innerHTML = "";
            document.querySelector(".description").innerHTML = "";
        }
    }

    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name");
        }
    });
});
