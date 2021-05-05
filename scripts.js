document.addEventListener("DOMContentLoaded", function () {
    function main() {

        let numberButtons = document.querySelectorAll('button.number');
        let operateButtons = document.querySelectorAll('button.operator');
        let screen = document.querySelector('#screen');

        let firstNum = '';
        let secondNum = '';
        let currentOperator = null;
        let equalsButton = document.querySelector('#equals-button');
        let clearButton = document.querySelector('#clear-button');
        let result;

        numberButtons.forEach((button) =>
            button.addEventListener("click", () => concatNumber(button.textContent))
        );

        operateButtons.forEach((button) =>
            button.addEventListener("click", () => selectOperation(button.innerHTML))
        );

        equalsButton.addEventListener('click', () => {
            if (currentOperator !== null) {
                console.log(`first number is: ${firstNum}, second number is ${secondNum}`);
                result = operate(currentOperator, firstNum, secondNum);
                currentOperator = null;
            }
        });

        clearButton.addEventListener('click', () => {
            firstNum = '';
            secondNum = '';
            clearScreen();
        });


        function concatNumber(number) {
            if (screen.textContent === "0" || isNaN(screen.textContent)) {
                clearScreen();
            }
            //dont concat number if number on screen is a calculated result
            if (parseFloat(screen.textContent) === result) {
                clearScreen();
                firstNum = '';
                secondNum = '';
            }
            screen.textContent += number;
            if (firstNum) {
                secondNum = parseFloat(screen.textContent);
            }
            else {
                firstNum = parseFloat(screen.textContent);
            }
        }

        function selectOperation(operator) {
            if (currentOperator !== null && firstNum && secondNum) {
                screen.textContent = operate(currentOperator, firstNum, secondNum);
            }
            currentOperator = operator;
            screen.textContent = currentOperator;
        }

        function clearScreen() {
            screen.textContent = '';

        }







        function add(a, b) {
            return a + b;
        };
        function subtract(a, b) {
            return a - b;
        }
        function multiply(a, b) {
            return a * b;
        }
        function divide(a, b) {
            return a / b;
        }
        function operate(operator, a, b) {

            operator === '+' ? result = add(a, b) :
                operator === '-' ? result = subtract(a, b) :
                    operator === '*' ? result = multiply(a, b) :
                        operator === '/' ? result = divide(a, b) :
                            console.log('error');
            firstNum = result;
            secondNum = 0;
            screen.textContent = result;
            return result;
        }

    }
    main();




});