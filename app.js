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

  calc = (currentFloat, prevFloat) => {
    switch (this.operand) {
      case '+':
        this.currentNumber = (prevFloat + currentFloat).toString();
        break;
      case '-':
        this.currentNumber = (prevFloat - currentFloat).toString();
        break;
      case 'x':
        this.currentNumber = (prevFloat * currentFloat).toString();
        break;
      case '÷':
        if (currentFloat === 0) {
          this.currentNumber = 'NaN';
          return;
        }
        this.currentNumber = (prevFloat / currentFloat).toString();
        break;
      case '^':
        this.currentNumber = (prevFloat ** currentFloat).toString();
        break;
      default:
    }
  };

  equal = () => {
    const currentFloat = parseFloat(this.currentNumber);
    const prevFloat = parseFloat(this.prevNumber);
    if (isNaN(currentFloat) || isNaN(prevFloat)) return;

    this.calc(currentFloat, prevFloat);

    this.operand = '';
    this.prevNumber = '';
    this.updateDisplay();
  };

  operate = (operand) => {
    const currentFloat = parseFloat(this.currentNumber);
    const prevFloat = parseFloat(this.prevNumber);
    if (isNaN(currentFloat)) return;

    if (!isNaN(prevFloat)) {
      this.calc(currentFloat, prevFloat);
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
  element.addEventListener('click', () => {
    calculator.addDigit(element.textContent);
  });
});

document.querySelectorAll('[data-operator]').forEach((element) => {
  element.addEventListener('click', () => {
    calculator.operate(element.textContent);
  });
});

document.querySelector('[data-delete]').addEventListener('click', () => {
  calculator.deleteDigit();
});

document.querySelector('[data-clear]').addEventListener('click', () => {
  calculator.clear();
});

document.querySelector('[data-equal]').addEventListener('click', () => {
  calculator.equal();
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
      calculator.equal();
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
