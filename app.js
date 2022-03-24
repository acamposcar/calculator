// @ts-check

let currentNumber = '';
let prevNumber = '';
let operator = null;

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

function operate(a, b, oper) {
  switch (oper) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return subtract(a, b);
    case 'divide':
      return divide(a, b);
    default:
      return null;
  }
}

function displayNum() {
  document.querySelector('#display-number').textContent = currentNumber;
  document.querySelector('#display-prev').textContent = `${prevNumber} ${operator}`;
}

document.querySelectorAll('.key.operator').forEach((key) => {
  key.addEventListener('click', () => {
    let result = '';
    if (operator) {
      result = operate(parseInt(prevNumber, 10), parseInt(currentNumber, 10), operator);
      prevNumber = currentNumber;
      currentNumber = result.toString();
    } else {
      prevNumber = currentNumber;
    }
    operator = key.dataset.key;

    displayNum();
  });
});

document.querySelectorAll('.key.number').forEach((key) => {
  key.addEventListener('click', () => {
    // Limit the number of numbers that can be displayed on the screen
    const numberLength = currentNumber.split('').length;
    if (numberLength <= 9) {
      currentNumber += key.dataset.key;
    }
    displayNum();
  });
});
