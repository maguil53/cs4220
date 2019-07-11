const form = document.querySelector("form");
const result = document.getElementById("result");
const userInput = document.getElementById("userInput");

const radioFahrenheit = document.getElementById("fahrenheit");
const radioCelsius = document.getElementById("celsius");

const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");

form.addEventListener("submit", event => {
  event.preventDefault();

  convert();
});

radioFahrenheit.addEventListener("change", event => {
  animateLabel(1);
});

radioCelsius.addEventListener("change", event => {
  animateLabel(2);
});

function convert() {
  // Using let because this value is going to be changing everytime the user types something.
  let currentInput = userInput.value;

  if (checkTextInput(currentInput) && checkRadioInput()) {
    // Check which Radio has been checked.
    if (radioFahrenheit.checked) {
      result.innerHTML = fahrenheitToCelsius(userInput.value);
      fahrenheitToCelsius(userInput.value);
    } else if (radioCelsius.checked) {
      result.innerHTML = celsiusToFahrenheit(userInput.value);
    }
  }
}

// Checks if AT LEAST one radio button has been checked.
function checkRadioInput() {
  if (radioFahrenheit.checked || radioCelsius.checked) {
    return true;
  }

  result.innerHTML = "Error! Please select a conversion.";
  return false;
}

function checkTextInput(value) {
  // Empty String
  if (value.length === 0) {
    result.innerHTML = "Error! Please enter something!";
    return false;
  }

  let input = parseFloat(value);

  if (isNaN(input)) {
    result.innerHTML = "Only numbers please!";
    return false;
  } else {
    return true;
  }
}

function celsiusToFahrenheit(input) {
  let celsius = parseFloat(input);
  let fahrenheit = (celsius * (9 / 5) + 32).toFixed(2);
  let formattedResult = `${celsius}&#8451; = ${fahrenheit}&#8457;`;

  return formattedResult;
}

function fahrenheitToCelsius(input) {
  let fahrenheit = parseFloat(input);
  let celsius = ((fahrenheit - 32) * (5 / 9)).toFixed(2);
  let formattedResult = `${fahrenheit}&#8457; = ${celsius}&#8451;`;

  return formattedResult;
}

// Animation when user checks a radio button.
function animateLabel(radioID) {
  if (radioID === 1) {
    label1.setAttribute("style", "border: 4px solid black;");
    // Reset original style for unchecked radio button
    label2.setAttribute("style", "border: 0.1px solid black;");
  } else if (radioID === 2) {
    label2.setAttribute("style", "border: 4px solid black;");
    // Reset original style for unchecked radio button
    label1.setAttribute("style", "border: 0.1px solid black;");
  }
}
