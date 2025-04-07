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

  // Color mapping based on temperature range
  const temperatureColors = {
    0: "#87CEEB",
    1: "#87CEEC",
    2: "#87CEEE",
    3: "#87CEEF",
    4: "#87CEF1",
    5: "#87CEF2",
    6: "#87CEF4",
    7: "#87CEF5",
    8: "#87CEF7",
    9: "#87CEF8",
    10: "#87CEFA",
    11: "#79CCFA",
    12: "#6CCBFB",
    13: "#5EC9FB",
    14: "#51C8FC",
    15: "#43C6FC",
    16: "#36C5FD",
    17: "#28C3FD",
    18: "#1AC2FE",
    19: "#0DC0FE",
    20: "#00BFFF",
    21: "#03BAFF",
    22: "#06B5FF",
    23: "#09B0FF",
    24: "#0CACFF",
    25: "#0FA7FF",
    26: "#12A2FF",
    27: "#159EFF",
    28: "#1899FF",
    29: "#1B94FF",
    30: "#1E90FF",
    31: "#218CFC",
    32: "#2588F9",
    33: "#2884F6",
    34: "#2C80F3",
    35: "#2F7CF0",
    36: "#3378ED",
    37: "#3674EA",
    38: "#3A70E7",
    39: "#3D6CE4",
    40: "#4169E1",
    41: "#3F73CF",
    42: "#3E7DBE",
    43: "#3C87AC",
    44: "#3B919B",
    45: "#399B89",
    46: "#38A578",
    47: "#36AF66",
    48: "#35B955",
    49: "#33C343",
    50: "#32CD32",
    51: "#3ED231",
    52: "#4AD731",
    53: "#56DC31",
    54: "#63E130",
    55: "#6FE630",
    56: "#7BEB30",
    57: "#88F02F",
    58: "#94F52F",
    59: "#A0FA2F",
    60: "#ADFF2F",
    61: "#B5FF2A",
    62: "#BDFF25",
    63: "#C5FF20",
    64: "#CDFF1C",
    65: "#D6FF17",
    66: "#DEFF12",
    67: "#E6FF0E",
    68: "#EEFF09",
    69: "#F6FF04",
    70: "#FFFF00",
    71: "#FFF600",
    72: "#FFED00",
    73: "#FFE400",
    74: "#FFDB00",
    75: "#FFD200",
    76: "#FFC900",
    77: "#FFC000",
    78: "#FFB700",
    79: "#FFAE00",
    80: "#FFA500",
    81: "#FFA200",
    82: "#FFA000",
    83: "#FF9D00",
    84: "#FF9B00",
    85: "#FF9800",
    86: "#FF9600",
    87: "#FF9300",
    88: "#FF9100",
    89: "#FF8E00",
    90: "#FF8C00",
    91: "#FF8400",
    92: "#FF7D00",
    93: "#FF7600",
    94: "#FF6F00",
    95: "#FF6800",
    96: "#FF6100",
    97: "#FF5A00",
    98: "#FF5300",
    99: "#FF4C00",
    100: "#FF4500",
    101: "#FF3E00",
    102: "#FF3700",
    103: "#FF3000",
    104: "#FF2900",
    105: "#FF2200",
    106: "#FF1B00",
    107: "#FF1400",
    108: "#FF0D00",
    109: "#FF0600",
    110: "#FF0000",
    111: "#F30000",
    112: "#E70000",
    113: "#DC0000",
    114: "#D00000",
    115: "#C50000",
    116: "#B90000",
    117: "#AD0000",
    118: "#A20000",
    119: "#960000",
    120: "#8B0000",
  };

  // Function to get temperature color
  function getTemperatureColor(value) {
    return temperatureColors[value] || "#8B0000"; // Default to dark red if out of range
  }

  // Function to update temperature UI
  function updateTemperatureDisplay(value) {
    const color = getTemperatureColor(value); // Get color based on temperature

    // Update slider value
    sliderValue.textContent = `${value}°`;
    sliderValue.style.color = color; // Change text color

    // Update half-circle number
    const marker = halfCircleTemp.querySelector("#marker");
    halfCircleTemp.textContent = value;
    halfCircleTemp.style.color = color; // Change half-circle number color
    halfCircleTemp.appendChild(marker);

    // Rotate the outside circle
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
