function updateSliderValue(slider) {
  let leftValue = slider.previousElementSibling;
  let rightValue = slider.nextElementSibling;

  leftValue.textContent = slider.min;
  rightValue.textContent = slider.max;
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the slider and the current value span
  const slider = document.querySelector(".location-slider");
  const currentValue = document.getElementById("current-value");

  // Set initial value
  currentValue.textContent = slider.value;

  // Update value when slider changes
  slider.addEventListener("input", function () {
    currentValue.textContent = this.value;
  });
});
