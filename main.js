const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";

for(let k of keys) {
    const value = k.dataset.key;
    
    k.addEventListener('click', () => {
        if(value == "clear") {
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        }
        else if(value == "backspace") {
            input = input.slice(0, -1);
            displayInput.innerHTML =  cleanInput(input);
        }
        else if(value == "=") {
            let result = input == "" ? 0 : eval(prepareInput(input));
            displayOutput.innerHTML = cleanOutput(result);
            input = "";
        }
        else if(value == 'brackets') {
            if(input.indexOf("(") == -1 || (input.indexOf("(") != -1 && input.indexOf(")") != "-1" && input.lastIndexOf("(") < input.lastIndexOf(")"))) {
                input += "(";
            }
            else if((input.indexOf("(") != -1 && input.indexOf(")") == -1) || (input.indexOf("(") != -1 && input.indexOf(")") != "-1" && input.lastIndexOf("(") > input.lastIndexOf(")"))) {
                input += ")";
            }
            displayInput.innerHTML =  cleanInput(input);
        }
        else {
            if(validateInput(value)) {
                input += value;
                displayInput.innerHTML = cleanInput(input);
            }
        }

    });
}

function cleanInput(input) {
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;
    for(let i = 0; i<inputArrayLength; ++i) {
        if(inputArray[i] == "*") {
            inputArray[i] = " <span class = 'operator'>x</span> ";
        }
        else if(inputArray[i] == "/") {
            inputArray[i] = " <span class = 'operator'>&divide;</span> ";
        }
        else if(inputArray[i] == "+") {
            inputArray[i] = " <span class = 'operator'>+</span> ";
        }
        else if(inputArray[i] == "-") {
            inputArray[i] = " <span class = 'operator'>-</span> ";
        }
        else if(inputArray[i] == "(") {
            inputArray[i] = "<span class = 'brackets'>(</span>";
        }
        else if(inputArray[i] == ")") {
            inputArray[i] = "<span class = 'brackets'>)</span>";
        }
        else if(inputArray[i] == "%") {
            inputArray[i] = "<span class = 'percent'>%</span>";
        }
    }
    return inputArray.join("");
}

function cleanOutput(output) {
    let outputString = output.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];
    let outputArray = outputString.split("");
    if(outputArray.length > 3) {
        for(let i = outputArray.length-3; i>0; i-=3) {
            outputArray.splice(i, 0, ",");
        }
    }
    if(decimal) {
        outputArray.push(".");
        outputArray.push(decimal);
    }
    return outputArray.join("");
}

function validateInput(value) {
    let lastInput = input.slice(-1);
    let operators = ["+", "-", "/", "*", "%"];
    if(value == "." && Number.isInteger(parseInt(lastInput)) == false) {
        return false;
    }
    if(operators.includes(value)) {
        if(operators.includes(lastInput) || Number.isInteger(parseInt(lastInput)) == false) {
            return false;
        }
    }
    return true;
}

function prepareInput(input) {
    let inputArray = input.split("");
    for(let i = 0; i<inputArray.length; ++i) {
        if(inputArray[i] == "%") {
            inputArray[i] = "/100";
        }
    }
    return inputArray.join("");
}