function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

let number1 = "";
let operator = "";
let number2 = "";
let calculated = false;
let error = false;

function operate(number1, operator, number2) {
    let result;
    if (operator === "+") {
        result = add(number1, number2);
    }
    else if (operator === "-") {
        result = subtract(number1, number2);
    }
    else if (operator === "*") {
        result = multiply(number1, number2);
    }
    else if (operator === "/") {
        if (number2 === 0) {
            return "Can't divide by 0!";
        }
        result = divide(number1, number2);
    }
    else {
        return "Invalid operator!"
    }

    return Number(result.toFixed(3));
}

function typeDigits(button) {
    if (calculated || error) {
        display.textContent = "";
        number1 = "";
        operator = "";
        number2 = "";
        calculated = false;
        error = false;
    }
    if(!operator) {
        if (button.textContent === ".") {
            if (number1.includes(".")){
                return;
            }
        }
        display.textContent += button.textContent;
        number1 += button.textContent;
        console.log("Number 1: " + number1);
    }
    else {
        if (button.textContent === ".") {
            if (number2.includes(".")){
                return;
            }
        }
        display.textContent += button.textContent;
        number2 += button.textContent;
        console.log("Number 2: " + number2);
    }
}

function typeOperators(button) {
    if (calculated || error) {
        display.textContent = "";
        number1 = "";
        operator = "";
        number2 = "";
        calculated = false;
        error = false;
    }
    
    if(!number1) {
        return;
    }
    if (operator) {
        if(number2) {
            let result = operate(Number(number1), operator, Number(number2))
            if (typeof result === "number") {
                display.textContent = result + button.textContent;
                number1 = String(result);
                operator = button.textContent;
                number2 = "";
            }
            else {
                display.textContent = result;
                number1 = "";
                operator = "";
                number2 = "";
                calculated = false;
                error = true;
            }
        }
        else {
            display.textContent = number1 + button.textContent;
            operator = button.textContent
        }
    }
    else {
        display.textContent += button.textContent;
        operator = button.textContent;
    }
}

function calculate() {
    if (!(number1 && operator && number2)) {
        return;
    }
    let result = operate(Number(number1), operator, Number(number2))
    display.textContent = result;
    if (typeof result === "number") {
        number1 = String(result);
        calculated = true;
    }
    else {
        number1 = "";
        calculated = false;
        error = true;
    }
    operator = "";
    number2 = "";
}

function backspace() {
    if (operator && number2) {
        number2 = number2.slice(0, number2.length - 1);
    }
    else if (operator && !number2){
        operator = operator.slice(0, operator.length - 1);
    }
    else {
        number1 = number1.slice(0, number1.length - 1);
    }
    display.textContent = number1 + operator + number2;
}

const display = document.querySelector(".calculator-display");

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");

digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        typeDigits(button);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        typeOperators(button);
    });
});

const equalSign = document.querySelector(".equal-sign");

equalSign.addEventListener("click", () => {
    calculate();
});

const clearButton = document.querySelector(".clear-button");

clearButton.addEventListener("click", () => {
    display.textContent = "";
    number1 = "";
    operator = "";
    number2 = "";
    calculated = false;
    error = false;
});

const backspaceButton = document.querySelector(".backspace-button");

backspaceButton.addEventListener("click", () => {
    backspace();
});

document.addEventListener("keydown", (event) => {
    digitButtons.forEach((button) => {
        if (event.key === button.textContent) {
            typeDigits(button);
        }
    });
    
    operatorButtons.forEach((button) => {
        if (event.key === button.textContent) {
            event.preventDefault();
            typeOperators(button);
        }
    });

    if (event.key === "=") {
        equalSign.click();
    }

    if (event.key === "Backspace") {
        backspaceButton.click();
    }
});