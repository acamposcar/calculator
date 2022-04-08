// @ts-check

class Calculator {
  constructor() {
    this.currentNumber = '';
    this.prevNumber = '';
    this.operand = '';
  }

  clear = () => {
    this.currentNumber = '';
    this.prevNumber = '';
    this.operand = '';
    this.updateDisplay();
  };

  calc = () => {
    let result;
    const currentFloat = parseFloat(this.currentNumber);
    const prevFloat = parseFloat(this.prevNumber);

    if (isNaN(currentFloat) || isNaN(prevFloat)) return;

    switch (this.operand) {
      case '+':
        result = (prevFloat + currentFloat).toString();
        break;
      case '-':
        result = (prevFloat - currentFloat).toString();
        break;
      case 'x':
        result = (prevFloat * currentFloat).toString();
        break;
      case '÷':
        if (currentFloat === 0) {
          result = 'NaN';
          break;
        }
        result = (prevFloat / currentFloat).toString();
        break;
      case '^':
        result = (prevFloat ** currentFloat).toString();
        break;
      default:
    }

    this.operand = '';
    this.prevNumber = '';
    this.currentNumber = result;
    this.updateDisplay();
  };

  operate = (operand) => {
    const currentFloat = parseFloat(this.currentNumber);
    const prevFloat = parseFloat(this.prevNumber);
    if (isNaN(currentFloat)) return;

    if (!isNaN(prevFloat)) {
      this.calc();
    }
    this.operand = operand;
    this.prevNumber = this.currentNumber;
    this.currentNumber = '';
    this.updateDisplay();
  };

  addDigit = (digit) => {
    if (digit === '.' && this.currentNumber.includes('.')) return;

    this.currentNumber += digit.toString();
    this.updateDisplay();
  };

  deleteDigit = () => {
    this.currentNumber = this.currentNumber.slice(0, -1);
    this.updateDisplay();
  };

  updateDisplay = () => {
    const currentDisplay = document.querySelector('#display-current');
    const prevDisplay = document.querySelector('#display-prev');
    currentDisplay.textContent = this.currentNumber;
    prevDisplay.textContent = `${this.prevNumber} ${this.operand}`;
  };
}

const calculator = new Calculator();

document.querySelectorAll('[data-number]').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (event.pointerType !== 'mouse') return;
    calculator.addDigit(element.textContent);
  });
});

document.querySelectorAll('[data-operator]').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (event.pointerType !== 'mouse') return;
    calculator.operate(element.textContent);
  });
});

document.querySelector('[data-delete]').addEventListener('click', (event) => {
  if (event.pointerType !== 'mouse') return;
  calculator.deleteDigit();
});

document.querySelector('[data-clear]').addEventListener('click', (event) => {
  if (event.pointerType !== 'mouse') return;
  calculator.clear();
});

document.querySelector('[data-equal]').addEventListener('click', (event) => {
  if (event.pointerType !== 'mouse') return;
  calculator.calc();
});

/* KEYBOARD */

document.addEventListener('keydown', (event) => {
  if (isFinite(event.key) || event.key === '.') {
    calculator.addDigit(event.key);
    return;
  }

  switch (event.key) {
    case '+':
      calculator.operate('+');
      break;
    case '^':
      calculator.operate('^');
      break;
    case '-':
      calculator.operate('-');
      break;
    case '*':
      calculator.operate('x');
      break;
    case '/':
      calculator.operate('÷');
      break;
    case 'Enter':
      calculator.calc();
      break;
    case 'Backspace':
      calculator.deleteDigit();
      break;
    case 'Delete':
      calculator.clear();
      break;
    default:
      break;
  }
});
