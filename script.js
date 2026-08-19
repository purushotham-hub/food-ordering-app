let display = document.getElementById("display");


// Add number or operator to display
function appendValue(value) {

    if (display.value === "0") {
        display.value = value;
    } 
    else {
        display.value += value;
    }
}


// Clear display
function clearDisplay() {
    display.value = "0";
}


// Delete last character
function deleteNumber() {

    if (display.value.length === 1) {
        display.value = "0";
    } 
    else {
        display.value = display.value.slice(0, -1);
    }
}


// Calculate result
function calculate() {

    try {

        let expression = display.value;

        // Convert percentage
        expression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        let result = eval(expression);

        if (!isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = result;

    } 
    catch (error) {

        display.value = "Error";

        setTimeout(() => {
            display.value = "0";
        }, 1000);
    }
}