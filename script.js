const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");
const currentOperator = document.querySelector(".current-operator");
const equalButton = document.querySelector(".operator-equal");
const resultField = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".operator-backspace");
let firstNumber = 0;
let secondNumber = 0;
let operator = "";

function add(a, b) {
    console.log(a + b);
    return a + b;
}

function subtract(a, b) {
    console.log(a - b);
    return a - b;
}

function multiply(a, b) {
    console.log(a * b);
    return a * b;
}

function divide(a, b) {
    console.log(a / b);
    return a / b;
}

function operate(a, b, operator) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        // The decimal button should be disabled if there is already a decimal in the current operand
        if (button.textContent === "." && currentOperand.textContent.includes(".")) {
            return;
        }
        currentOperand.textContent += button.textContent;
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        firstNumber = Number(currentOperand.textContent);
        previousOperand.textContent = currentOperand.textContent;
        currentOperand.textContent = "";
        currentOperator.textContent = button.textContent;
        operator = button.textContent;
    })
})

equalButton.addEventListener("click", () => {
    secondNumber = Number(currentOperand.textContent);
    // Equal button should not be called if operands are empty
    if (currentOperand.textContent === "") {
        return;
    }
    // If the operator is division and second operand is 0, display error
    if (operator === "/" && secondNumber === 0) {
        resultField.textContent = "Cannot divide by zero";
        return;
    }
    // Result should be rounded to 2 decimal places
    resultField.textContent = Math.round(operate(firstNumber, secondNumber, operator) * 100) / 100
    currentOperand.textContent = resultField.textContent;
    previousOperand.textContent = "";
    currentOperator.textContent = "";
})

function clear() {
    currentOperand.textContent = "";
    previousOperand.textContent = "";
    currentOperator.textContent = "";
    resultField.textContent = 0;
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
}

clearButton.addEventListener("click", clear);

backspaceButton.addEventListener("click", () => {
    currentOperand.textContent = currentOperand.textContent.slice(0, -1);
});

// Add keyboard support

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        equalButton.click();
    } else if (event.key === "Escape") {
        clear();
    } else if (event.key === "=") {
        event.preventDefault();
        equalButton.click();
    } else if (event.key === "Backspace") {
        backspaceButton.click();
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        operatorButtons.forEach(button => {
            if (button.textContent === event.key) {
                button.click();
            }
        })
    } else if (event.key >= 0 && event.key <= 9) {
        numberButtons.forEach(button => {
            if (button.textContent === event.key) {
                button.click();
            }
        })
    }
})