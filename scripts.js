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
        let decimalPoint = document.querySelector('#decimal');
        let result;
        let backspace = document.querySelector('#delete');

        numberButtons.forEach((button) =>
            button.addEventListener("click", () => concatNumber(button.textContent))
        );

        operateButtons.forEach((button) =>
            button.addEventListener("click", () => selectOperation(button.value))
        );

        equalsButton.addEventListener('click', () => {
            if (currentOperator !== null) {
                console.log(`first number is: ${firstNum}, second number is ${secondNum}`);
                result = operate(currentOperator, firstNum, secondNum);
                result = Math.round(result * 1000) / 1000;
                currentOperator = null;
            }
        });

        clearButton.addEventListener('click', () => {
            firstNum = '';
            secondNum = '';
            clearScreen();
        });

        decimalPoint.addEventListener('click', () => {
            if(screen.textContent.includes('.')){
                console.log(screen.textContent)
            }
            else {
            screen.textContent += '.';
            }
        });

        backspace.addEventListener('click', ()=>{
            screen.textContent = screen.textContent.toString().slice(0, -1);
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
      
        }

        function selectOperation(operator) {
            if (currentOperator !== null && firstNum && secondNum) {
                screen.textContent = operate(currentOperator, firstNum, secondNum);
            }
            firstNum = parseFloat(screen.textContent);
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
            let roundedResult = Math.round(result * 1000) / 1000;
            screen.textContent = roundedResult;
            return roundedResult;
        }

    }
    main();




});
