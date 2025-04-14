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

  document.addEventListener("click", function (event) {
    const isClickInsideSettings = settingsMenu.contains(event.target);
    const isClickOnSettingsButton = settingsButton.contains(event.target);
    const isClickOnMinusButton = event.target.id === "minus-button";

    if (
      !isClickInsideSettings &&
      !isClickOnSettingsButton &&
      !isClickOnMinusButton
    ) {
      settingsMenu.style.display = "none";

      const minusButtons = document.querySelectorAll("#minus-button");
      minusButtons.forEach((button) => {
        button.style.display = "none";
      });
    }
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
      <button id="minus-button" style="display: none">-</button>
      <span class="location-name">${location}</span>
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

    const minusButton = locationRow.querySelector("#minus-button");
    minusButton.addEventListener("click", () => {
      locationRow.remove();
    });

    checkForOverlap();
  }

  function checkForOverlap() {
    const rows = document.querySelectorAll(".location-row");

    rows.forEach((row) => {
      const nameSpan = row.querySelector("span:not(#minus-button)");
      const sliderContainer = row.querySelector(".slider-container");

      if (nameSpan && sliderContainer) {
        const nameRect = nameSpan.getBoundingClientRect();
        const sliderRect = sliderContainer.getBoundingClientRect();

        const isOverlapping =
          nameRect.right > sliderRect.left && nameRect.left < sliderRect.right;

        if (isOverlapping) {
          console.log(`${nameSpan.textContent} is overlapped by its slider.`);
        }
      }
    });
  }

  window.addEventListener("resize", checkForOverlap);

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      alert(`You searched for: ${searchInput.value}`);
    }
  });

  const settingsButton = document.getElementById("settings-button");
  const settingsMenu = document.getElementById("settings-menu");
  const closeButton = document.getElementById("close-button");

  settingsButton.addEventListener("click", () => {
    settingsMenu.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    settingsMenu.style.display = "none";

    const minusButtons = document.querySelectorAll("#minus-button");
    minusButtons.forEach((button) => {
      button.style.display = "none";
    });
  });

  // Dark Mode toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
  });

  // Temperature Units toggle (°C / °F)
  const tempUnitsToggle = document.getElementById("temp-units-toggle");
  tempUnitsToggle.addEventListener("change", () => {
    if (tempUnitsToggle.checked) {
      // Switch to Fahrenheit
    } else {
      // Switch to Celsius
    }
  });

  // Use My Current Location toggle
  const currentLocationToggle = document.getElementById("use-current-location");
  currentLocationToggle.addEventListener("change", () => {
    if (currentLocationToggle.checked) {
      // Get weather using geolocation API
    } else {
      // Use selected locations
    }
  });

  const showMapToggle = document.getElementById("show-map");
  const mapElement = document.getElementById("map");

  showMapToggle.addEventListener("change", () => {
    const isVisible = showMapToggle.checked;
    mapElement.style.display = isVisible ? "block" : "none";

    if (isVisible && !document.querySelector("#map svg")) {
      const width = document.getElementById("map").clientWidth;
      const height = document.getElementById("map").clientHeight;

      const svg = d3
        .select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const projection = d3
        .geoNaturalEarth1()
        .scale(width / 6.3)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);
      const tooltip = d3.select("#tooltip");

      d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then(
        (worldData) => {
          const countries = topojson.feature(
            worldData,
            worldData.objects.countries
          ).features;

          svg
            .selectAll(".country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path)
            .on("mouseover", function (event, d) {
              d3.select(this).style("fill", "#005f99");
              tooltip.style("display", "block");
            })
            .on("mousemove", function (event, d) {
              const countryName = d.properties.name || "Unknown Country";
              tooltip
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px")
                .text(countryName);
            })
            .on("mouseout", function () {
              d3.select(this).style("fill", "#c0c0c0");
              tooltip.style("display", "none");
            });
        }
      );
    }
  });

  // Clear Saved Locations
  const clearLocationsButton = document.getElementById("clear-locations");
  clearLocationsButton.addEventListener("click", () => {
    const savedLocationsContainer = document.getElementById("saved-locations");
    savedLocationsContainer.innerHTML = ""; // Clear the container
  });

  // Edit Locations toggle
  const editLocationsButton = document.getElementById("edit-locations");

  editLocationsButton.addEventListener("click", () => {
    const minusButtons = document.querySelectorAll("#minus-button");
    minusButtons.forEach((button) => {
      button.style.display = button.style.display === "none" ? "block" : "none";
      if (!button.dataset.listenerAttached) {
        button.addEventListener("click", () => {
          button.closest(".location-row").remove();
        });
        button.dataset.listenerAttached = "true";
      }
    });
  });
});
