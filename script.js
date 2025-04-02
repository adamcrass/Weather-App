document.addEventListener("DOMContentLoaded", function () {
  const tempSlider = document.getElementById("temp-slider");
  const sliderValue =
    document.getElementById("slider-value") || createSliderValueElement();
  const halfCircleTemp = document.getElementById("half-circle");
  const outsideCircle = document.querySelector("#outside-circle svg g");
  const timeBelt = document.querySelector("#time-belt");
  const wrapper = document.querySelector(".time-belt-wrapper");

  // Function to create slider value element if missing
  function createSliderValueElement() {
    const valueElement = document.createElement("span");
    valueElement.id = "slider-value";
    valueElement.textContent = tempSlider.value + "°";
    tempSlider.parentNode.appendChild(valueElement);
    return valueElement;
  }

  // Function to map temperature to rotation angle (Reverse direction)
  function calculateRotation(value) {
    const minTemp = 0;
    const maxTemp = 120;
    const maxAngle = -3.5;
    const minAngle = -275;
    return (
      maxAngle -
      ((value - minTemp) / (maxTemp - minTemp)) * (maxAngle - minAngle)
    );
  }

  // Function to update temperature UI
  function updateTemperatureDisplay(value) {
    sliderValue.textContent = `${value}°`;
    const marker = halfCircleTemp.querySelector("#marker");
    halfCircleTemp.textContent = value;
    halfCircleTemp.appendChild(marker);
    const rotationDegree = calculateRotation(value);
    outsideCircle.setAttribute(
      "transform",
      `rotate(${rotationDegree}, 200, 200)`
    );
  }

  // Event listener for temperature slider
  tempSlider.addEventListener("input", function () {
    updateTemperatureDisplay(parseInt(this.value));
  });

  // Initialize temperature UI with default value
  updateTemperatureDisplay(parseInt(tempSlider.value));

  // Duplicate time chunks for seamless looping
  wrapper.innerHTML += wrapper.innerHTML;

  // Function to reset scroll position for infinite loop effect
  function checkScrollPosition() {
    if (timeBelt.scrollLeft >= wrapper.scrollWidth / 2) {
      timeBelt.scrollLeft = 0;
    } else if (timeBelt.scrollLeft <= 0) {
      timeBelt.scrollLeft = wrapper.scrollWidth / 2 - timeBelt.clientWidth;
    }
  }

  // Listen for user scroll and reset position if needed
  timeBelt.addEventListener("scroll", checkScrollPosition);
});
