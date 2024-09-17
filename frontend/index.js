import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');

let currentValue = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    if (button !== clearBtn && button !== equalsBtn) {
        button.addEventListener('click', () => {
            if (button.classList.contains('num')) {
                currentValue += button.textContent;
                display.value = currentValue;
            } else if (button.classList.contains('op')) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentValue);
                    operator = button.textContent;
                    currentValue = '';
                } else {
                    calculate();
                    operator = button.textContent;
                }
            }
        });
    }
});

clearBtn.addEventListener('click', () => {
    currentValue = '';
    operator = '';
    firstOperand = null;
    display.value = '';
});

equalsBtn.addEventListener('click', calculate);

async function calculate() {
    if (firstOperand !== null && currentValue !== '') {
        const secondOperand = parseFloat(currentValue);
        let result;

        try {
            switch (operator) {
                case '+':
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case '-':
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case '*':
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case '/':
                    result = await backend.divide(firstOperand, secondOperand);
                    break;
            }

            display.value = result;
            firstOperand = result;
            currentValue = '';
        } catch (error) {
            display.value = 'Error';
            firstOperand = null;
            currentValue = '';
        }
    }
}
