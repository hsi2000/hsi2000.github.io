// API KEY
const apiKey = 'a9f6b8f2d8831a4e0cf127e156a46d36';

//Variables to store references to elements
const cityInput = document.getElementById('cityInput');
const btn = document.getElementById('btn');
const weatherContainer = document.getElementById('weather-container');

//Event listener to the button to detect when it is clicked
btn.addEventListener('click', function () {
    //Value of the input field (city name)
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    //HTTP request to the OpenWeatherMap API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            //Updating the weather info div with weather details
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;

            //A new weather card and append it to the container
            const weatherCard = document.createElement('div');
            weatherCard.className = 'weather-card';

            const weatherHTML = `
                <h2>Weather in ${city}:</h2>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;

            weatherCard.innerHTML = weatherHTML;
            weatherContainer.insertBefore(weatherCard, weatherContainer.firstChild); // Inserts at the beginning

            // Clears the input field
            cityInput.value = '';
        })
        .catch(error => {
            // Error handling
            if (error.message === 'City not found') {
                alert('City not found. Please enter a valid city name.');
            } else {
                console.error('An error occurred:', error);
            }
        });
});
