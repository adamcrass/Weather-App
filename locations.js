function updateSliderValue(slider, currentValueSpan) {
  currentValueSpan.textContent = slider.value;
}

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

  // Example weather locations data (can be replaced with API call)
  const locationsDatabase = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "Austin",
    // Add more locations here or fetch from an API
  ];

  // Function to filter locations based on the user's input
  function filterLocations(query) {
    return locationsDatabase.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Function to display suggestions in the UI
  function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = ""; // Clear previous suggestions

    suggestions.forEach((suggestion) => {
      const suggestionElement = document.createElement("div");
      suggestionElement.classList.add("suggestion-item");
      suggestionElement.textContent = suggestion;

      // Add click event to select a suggestion
      suggestionElement.addEventListener("click", function () {
        addLocationToSaved(suggestion);
        searchInput.value = ""; // Clear search input
        suggestionsContainer.innerHTML = ""; // Clear suggestions
      });

      suggestionsContainer.appendChild(suggestionElement);
    });
  }

  // Event listener for the search input
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();

    if (query) {
      const filteredLocations = filterLocations(query);
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
