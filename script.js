const numberButtons = document.querySelectorAll("[data-numero]");
const operadorButtons = document.querySelectorAll("[data-operador]");
const igualButtons = document.querySelector("[data-igual]");
const deleteButtons = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");

class Calcular {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }

  formatNumeroDisplay(number) {
    const numberDigits = number.toString();

    const integerDigits = parseFloat(numberDigits.split(".")[0]);
    const decimalDigits = numberDigits.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDigits}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let resultado;
    const previousOperandFloat = parseFloat(this.previousOperand);
    const currentOperandFloat = parseFloat(this.currentOperand);

    if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

    switch (this.operation) {
      case "+":
        resultado = previousOperandFloat + currentOperandFloat;
        break;
      case "-":
        resultado = previousOperandFloat - currentOperandFloat;
        break;
      case "/":
        resultado = previousOperandFloat / currentOperandFloat;
        break;
      case "*":
        resultado = previousOperandFloat * currentOperandFloat;
        break;
      default:
        return;
    }

    this.currentOperand = resultado;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand == "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousTextElement.innerText = `${this.formatNumeroDisplay(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentTextElement.innerText = this.formatNumeroDisplay(
      this.currentOperand
    );
  }
}

const calcular = new Calcular(previousTextElement, currentTextElement);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calcular.appendNumber(numberButton.innerText);
    calcular.updateDisplay();
  });
}

for (const operadorButton of operadorButtons) {
  operadorButton.addEventListener("click", () => {
    calcular.chooseOperation(operadorButton.innerText);
    calcular.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calcular.clear();
  calcular.updateDisplay();
});

igualButtons.addEventListener("click", () => {
  calcular.calculate();
  calcular.updateDisplay();
});

deleteButtons.addEventListener("click", () => {
  calcular.delete();
  calcular.updateDisplay();
});
