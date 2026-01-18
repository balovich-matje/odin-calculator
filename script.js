// Basic arithmetic operations
const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};

function performOperation(operator, num1, num2) {
    if (!(operator in operations)) {
        throw new Error(`Unsupported operator: ${operator}`);
    }
    if (operator === "/" && num2 === 0) {
        return "BOOM! Divided by zero";
    }
    return operations[operator](num1, num2);
}

// DOM Elements
const UI = {
    operator: document.querySelector(".selected-operator"),
    input: document.querySelector(".number-input"),
};

// Calculator state
let state = {
    firstNumber: 0,
    secondNumber: 0,
    operator: "",
    newNumber: true,
};

// Update display
function updateDisplay(value) {
    UI.input.value = value;
}

// Clear all display fields
function clearDisplay() {
    updateDisplay("0");
    UI.operator.textContent = "";
    state = { firstNumber: 0, secondNumber: 0, operator: "", newNumber: true };
}

// Handle number button clicks
function handleNumberClick(button) {
    const value = button.textContent;
    const currentValue = UI.input.value;

    // Handle decimal point
    if (value === ".") {
        if (state.newNumber) {
            updateDisplay("0.");
            state.newNumber = false;
        } else if (!currentValue.includes(".")) {
            updateDisplay(currentValue + ".");
        }
        return;
    }

    // Handle positive/negative toggle
    if (value === "+/-") {
        const num = parseFloat(currentValue);
        updateDisplay(String(-num));
        return;
    }

    // Handle regular numbers
    if (state.newNumber) {
        updateDisplay(value);
        state.newNumber = false;
    } else {
        updateDisplay(currentValue === "0" ? value : currentValue + value);
    }
}

// Handle operator button clicks
function handleOperatorClick(buttonValue) {
    const { firstNumber, operator } = state;
    const inputValue = parseFloat(UI.input.value);

    switch (buttonValue) {
        case "Del":
            const currentValue = UI.input.value;
            if (currentValue.length > 1) {
                updateDisplay(currentValue.slice(0, -1));
            } else {
                updateDisplay("0");
            }
            break;

        case "Clear":
            clearDisplay();
            break;

        case "=":
            if (!operator || state.newNumber) return;
            state.secondNumber = inputValue;
            const result = performOperation(operator, firstNumber, state.secondNumber);
            updateDisplay(String(result));
            state = { firstNumber: 0, secondNumber: 0, operator: "", newNumber: true };
            UI.operator.textContent = "";
            break;

        case "+":
        case "-":
        case "*":
        case "/":
            if (operator && !state.newNumber) {
                state.secondNumber = inputValue;
                state.firstNumber = performOperation(operator, firstNumber, state.secondNumber);
                updateDisplay(String(state.firstNumber));
            } else if (!state.newNumber) {
                state.firstNumber = inputValue;
            }

            UI.operator.textContent = buttonValue;
            state.operator = buttonValue;
            state.newNumber = true;
            break;
    }
}

// Event listeners
document.querySelectorAll(".number-buttons button").forEach(button => {
    button.addEventListener("click", () => handleNumberClick(button));
});

document.querySelectorAll(".operator-buttons button").forEach(button => {
    button.addEventListener("click", (e) => handleOperatorClick(e.target.textContent));
});