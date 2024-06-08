// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Fetch Restcountries data
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      // Create cards for each country
      data.forEach((country) => {
        const card = document.createElement("div");
        card.classList.add("card", "col-lg-4", "col-sm-12");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.textContent = country.name;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `
                    Capital: ${country.capital}<br>
                    Latlng: ${country.latlng}<br>
                    <img src="${country.flags[0]}" alt="Flag" width="50">
                `;

        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary");
        button.textContent = "Click for Weather";

        // Add event listener to the button
        button.addEventListener("click", () => {
          // Assume you have a reference to the cardBody element
          const cardBody = document.getElementById("card-body"); // Replace with your actual ID

          // Function to fetch weather data
          function fetchWeather(country) {
            const apiKey = "50a7aa80fa492fa92e874d23ad061374"; // Replace with your actual API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cardHeader.textContent}&appid=${apiKey}`;

            fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                // Extract relevant weather information (e.g., temperature, description)
                const temperature = data.main.temp;
                const description = data.weather[0].description;

                // Update the cardBody with weather information
                cardBody.innerHTML = `
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
            `;
              })
              .catch((error) => {
                console.error("Error fetching weather data:", error);
                cardBody.innerHTML =
                  "Error fetching weather data. Please try again later.";
              });
          }

          // Example usage (you can call this function when needed, e.g., button click)
          const selectedCountry = { name: "London" }; // Replace with the actual country object
          fetchWeather(selectedCountry);
        });

        cardBody.appendChild(button);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        document.querySelector(".row").appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
