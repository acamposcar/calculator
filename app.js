// @ts-check

// Global vars
let currentNumber;
let prevNumber;
let operator;
let result;
let waitNumber = true;

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

function exponential(a, b) {
  return a ** b;
}
function operate(a, b, oper) {
  switch (oper) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    case '^':
      return exponential(a, b);
    case 'backspace':
      return false;
    default:
      return null;
  }
}

function clearAll() {
  currentNumber = '';
  prevNumber = '';
  result = '';
  operator = null;
}

function updateCurrentNum(num) {
  // Limit the number of numbers that can be displayed on the screen
  const numberLength = currentNumber.split('').length;
  if (numberLength <= 9) {
    currentNumber += num;
  }
}

function updatePrevDisplay() {
  const roundNumber = Math.round(prevNumber * 1000000) / 1000000;
  document.querySelector('#display-prev').textContent = `${roundNumber}  ${operator || ''}`;
}

function updateCurrentDisplay() {
  const roundNumber = Math.round(currentNumber * 1000000) / 1000000;
  document.querySelector('#display-number').textContent = `${roundNumber}`;
}

// Operator Keys
document.querySelectorAll('.key.operator').forEach((key) => {
  key.addEventListener('click', () => {
    result = '';
    if (currentNumber || prevNumber) {
      if (!waitNumber) {
        if (operator) {
          result = operate(parseFloat(prevNumber), parseFloat(currentNumber), operator);
          currentNumber = result;
          prevNumber = currentNumber;
          updateCurrentDisplay();
        } else {
          prevNumber = currentNumber;
        }
      }
      waitNumber = true;
      operator = key.dataset.key;
      currentNumber = '';
      if (operator === 'equal') {
        operator = '';
        prevNumber = '';
        updatePrevDisplay();
        return;
      }
    }
    updatePrevDisplay();
  });
});

// Number Keys
document.querySelectorAll('.key.number').forEach((key) => {
  key.addEventListener('click', () => {
    waitNumber = false;
    updateCurrentNum(key.dataset.key);
    updateCurrentDisplay();
  });
});

// AC Key
document.querySelector('.key[data-key="AC"]').addEventListener('click', () => {
  clearAll();
  updateCurrentDisplay();
  updatePrevDisplay();
});

// Initiate
clearAll();
updateCurrentDisplay();
updatePrevDisplay();
