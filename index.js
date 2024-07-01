let runningTotal = 0;
let buffer = '0';
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            runningTotal = 0;
            buffer = '0';
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            if (previousOperator === '÷' && parseFloat(buffer) === 0) {
                buffer = 'Undefined';
                runningTotal = 0;
                previousOperator = null;
            } else {
                operate(parseFloat(buffer));
                previousOperator = null;
                buffer = '' + runningTotal;
                runningTotal = 0;
            }
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            buffer = '' + symbol;
            break;
        case '.':
            if (!buffer.includes('.')) {
                buffer += '.';
            }
            break;
    }
}

function handleMath(symbol) {

    const intBuffer = parseFloat(buffer); // Convert buffer to a float
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        operate(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function operate(intBuffer) {
    let result;
    if (previousOperator == '+') {
        result = runningTotal + intBuffer;
    } else if (previousOperator == '−') {
        result = runningTotal - intBuffer;
    } else if (previousOperator == '×') {
        result = runningTotal * intBuffer;
    } else if (previousOperator == '÷') {
        if (intBuffer === 0) {
            buffer = 'undefined';
            runningTotal = 0;
            previousOperator = null;
            screen.innerText = buffer;
            return;
        } else if (previousOperator == '÷') {
            if (intBuffer === 0) {
                buffer = 'Undefined';
                runningTotal = 0;
                previousOperator = null;
                screen.innerText = buffer;
                return;
            } else {
                result = runningTotal / intBuffer;
            }
        }
    }
    runningTotal = result;
}

function handleNumber(numberString) {
    if (!parseFloat(buffer)) {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

document.querySelector('.calc-buttons').addEventListener('click', function (event) {
    if (event.target.matches('button')) {
        buttonClick(event.target.innerText);
    }
});