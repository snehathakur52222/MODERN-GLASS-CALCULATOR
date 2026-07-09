const display = document.getElementById("display");

// Add value to display
function appendValue(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {

        if (display.value === "") return;

        let expression = display.value;

        // Calculate percentage
        expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

        const result = eval(expression);

        display.value = result;

    } catch (error) {

        display.value = "Error";

        setTimeout(() => {
            display.value = "";
        }, 1200);
    }
}

// Keyboard Support
document.addEventListener("keydown", function (event) {

    const key = event.key;

    // Numbers
    if (!isNaN(key)) {
        appendValue(key);
    }

    // Decimal
    else if (key === ".") {
        appendValue(".");
    }

    // Operators
    else if (["+", "-", "*", "/", "%"].includes(key)) {
        appendValue(key);
    }

    // Enter
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    else if (key === "Escape") {
        clearDisplay();
    }

});

// Prevent multiple operators together
const operators = ["+", "-", "*", "/", "%"];

function appendValue(value) {

    let lastChar = display.value.slice(-1);

    if (
        operators.includes(lastChar) &&
        operators.includes(value)
    ) {
        return;
    }

    display.value += value;
}