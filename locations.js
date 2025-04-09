function updateSliderValue(slider, currentValueSpan) {
  currentValueSpan.textContent = slider.value;
}

const API_KEY = "74f49bce5f9ce30ecf5a290595a23d1c"; // must be your actual key

document.addEventListener("DOMContentLoaded", function () {
  // Get all slider containers
  const sliderContainers = document.querySelectorAll(".slider-container");

  sliderContainers.forEach((container) => {
    const slider = container.querySelector(".location-slider");
    const currentValue = container.querySelector(".current-value");

    // Set initial value with degree symbol
    currentValue.textContent = slider.value + "°";

    // Update value on input
    slider.addEventListener("input", function () {
      currentValue.textContent = this.value + "°";
    });
  });

  const searchInput = document.querySelector("#search-box input");
  const suggestionsContainer = document.querySelector("#suggestions-container");

  // Function to filter locations based on the user's input
  async function filterLocations(query) {
    const limit = 5;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      query
    )}&limit=${limit}&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      return data.map((loc) => ({
        name: `${loc.name}, ${loc.country}`,
        lat: loc.lat,
        lon: loc.lon,
      }));
    } catch (error) {
      console.error("Error fetching location data:", error);
      return [];
    }
  }

  // Function to display suggestions in the UI
  function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = ""; // Clear previous suggestions

    suggestions.forEach((location) => {
      const suggestionElement = document.createElement("div");
      suggestionElement.classList.add("suggestion-item");
      suggestionElement.textContent = location.name;

      // Add click event to select a suggestion
      suggestionElement.addEventListener("click", function () {
        addLocationToSaved(location.name);
        searchInput.value = ""; // Clear search input
        suggestionsContainer.innerHTML = ""; // Clear suggestions
      });

      suggestionsContainer.appendChild(suggestionElement);
    });
  }

  // Event listener for the search input
  searchInput.addEventListener("input", async function () {
    const query = searchInput.value.trim();

    if (query) {
      const filteredLocations = await filterLocations(query);
      displaySuggestions(filteredLocations);
    } else {
      suggestionsContainer.innerHTML = ""; // Clear suggestions if input is empty
    }
  });

  // Function to add a new location to the saved list
  function addLocationToSaved(location) {
    const savedLocationsContainer = document.querySelector("#saved-locations");

    // Create a new location row with the selected location
    const locationRow = document.createElement("div");
    locationRow.classList.add("location-row");

    locationRow.innerHTML = `
      <span>${location}</span>
      <div class="slider-container">
        <span class="left-value">0°</span>
        <input type="range" class="location-slider" min="0" max="120" value="0" />
        <span class="right-value">120°</span>
        <span class="current-value">0°</span>
        <img src="../Images/Cloud Icon (Weather App).png" />
      </div>
    `;

    savedLocationsContainer.appendChild(locationRow);

    // Update the current value for the new location row
    const slider = locationRow.querySelector(".location-slider");
    const currentValue = locationRow.querySelector(".current-value");

    // Set initial value with degree symbol
    currentValue.textContent = slider.value + "°";

    // Update value on input for new location row
    slider.addEventListener("input", function () {
      currentValue.textContent = this.value + "°";
    });
  }

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      alert(`You searched for: ${searchInput.value}`);
    }
  });
});
