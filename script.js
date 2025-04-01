document.addEventListener("DOMContentLoaded", function () {
  const tempSlider = document.getElementById("temp-slider");
  const sliderValue = document.getElementById("slider-value");
  const halfCircleTemp = document.getElementById("half-circle");
  const outsideCircle = document.querySelector("#outside-circle svg g");

  // Function to map temperature to rotation angle (Reverse direction)
  function calculateRotation(value) {
    const minTemp = 0; // Minimum temperature
    const maxTemp = 120; // Maximum temperature
    const maxAngle = -3; // Reverse start angle (align 0° at the top)
    const minAngle = -275; // Reverse end angle (align 120° at the bottom)

    // Linearly map temperature to angle (Flipped)
    return (
      maxAngle -
      ((value - minTemp) / (maxTemp - minTemp)) * (maxAngle - minAngle)
    );
  }

  // Function to update UI when slider is moved
  function updateTemperatureDisplay(value) {
    sliderValue.textContent = `${value}°`;

    // Update half-circle display
    const marker = halfCircleTemp.querySelector("#marker");
    halfCircleTemp.textContent = value;
    halfCircleTemp.appendChild(marker); // Keep marker inside

    // Rotate the wheel (Reverse rotation)
    const rotationDegree = calculateRotation(value);
    outsideCircle.setAttribute(
      "transform",
      `rotate(${rotationDegree}, 200, 200)`
    );
  }

  // Event listener for slider movement
  tempSlider.addEventListener("input", function () {
    updateTemperatureDisplay(parseInt(this.value));
  });

  // Initialize the UI with default slider value
  updateTemperatureDisplay(parseInt(tempSlider.value));
});
