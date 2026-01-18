function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}



function performOperation(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}

let firstNum = 0;
let secondNum = 0;
let operator = "";
const firstInput = document.querySelector(".first-number");
const selectedOperator = document.querySelector(".selected-operator");
const inputField = document.querySelector(".number-input");
const resultField = document.querySelector(".result");

function updateDisplay(button) {
    inputField.value += button;
}

const numberButtons = document.querySelectorAll(".number-buttons button");
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        updateDisplay(number);
    });
});

const operatorButtons = document.querySelectorAll(".operator-buttons button");
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent;
        if (operator == "Del") {
            inputField.value = inputField.value.slice(0, -1);
        }
        if (operator == "Clear") {
            inputField.value = "";
        }
        if (operator == "=") {
            secondNum = parseInt(inputField.value);
            const result = performOperation(selectedOperator.textContent, firstNum, secondNum);
            resultField.textContent = result;
            firstNum = 0;
            secondNum = 0;
            inputField.value = "";
            firstInput.textContent = "";
            selectedOperator.textContent = "";
        }
        if (operator == "+") {
            firstInput.textContent = inputField.value;
            firstNum = parseInt(inputField.value);
            selectedOperator.textContent = "+";
            inputField.value = "";
        }
        if (operator == "-") {
            firstInput.textContent = inputField.value;
            firstNum = parseInt(inputField.value);
            selectedOperator.textContent = "-";
            inputField.value = "";
        }
        if (operator == "*") {
            firstInput.textContent = inputField.value;
            firstNum = parseInt(inputField.value);
            selectedOperator.textContent = "*";
            inputField.value = "";
        }
        if (operator == "/") {
            firstInput.textContent = inputField.value;
            firstNum = parseInt(inputField.value);
            selectedOperator.textContent = "/";
            inputField.value = "";
        }
    })
})


