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

  appendNumber(number) {
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousTextElement.innerText = this.previousOperand;
    this.currentTextElement.innerText = this.currentOperand;
  }
}

const calcular = new Calcular(previousTextElement, currentTextElement);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calcular.appendNumber(numberButton.innerText);
    calcular.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calcular.clear();
  calcular.updateDisplay();
});
