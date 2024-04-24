function PlaceFirstInputField(inputNumber) {
    document.getElementById("main_div").innerHTML = /*html*/ `
        <div class="input_div" id="input_div_${String(inputNumber)}">
            <input type="text" class="input_field" id="input_field_${String(inputNumber)}">
        </div>
        <div class="separator_div" id="separator_div_${String(inputNumber)}">
        </div>
    `;
}

function newConsoleLog() {
    var argsLen = arguments.length;
    var retVal = "";
    for (i = 0; i < argsLen; i += 1) {
        retVal += arguments[i];
        retVal += " ";
    }
    return retVal;
}

function ExecCodeIn(input, inputNumber) {
    var inp = input.value;
    var logBackup = console.log;
    console.log = newConsoleLog;
    var ans = eval(input.value);
    console.log = logBackup;
    document.getElementById(`separator_div_${String(inputNumber)}`).style.backgroundColor = "#fff";
    document.getElementById(`input_div_${String(inputNumber)}`).innerHTML = /*html*/ `
        <p class="input_p" id="input_p_${String(inputNumber)}">
            ${inp}
        </p>
    `;
    document.getElementById("main_div").innerHTML += /*html*/ `
        <div class="output_div" id="output_div_${String(inputNumber)}">
            <p class="output_p" id="output_p_${String(inputNumber)}">
                ${ans}
            </p>
        </div>
        <div class="separator_div" id="separator_div_${String(inputNumber)}">
        </div>
        <div class="input_div" id="input_div_${String(inputNumber + 1)}">
            <input type="text" class="input_field" id="input_field_${String(inputNumber + 1)}">
        </div>
        <div class="separator_div" id="separator_div_${String(inputNumber + 1)}">
        </div>
    `;
    var newInput = document.getElementById(`input_field_${String(inputNumber + 1)}`);
    newInput.tabIndex = 1;
    newInput.focus();
    var counter = inputNumber + 1;
    newInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            ExecCodeIn(newInput, inputNumber + 1);
        }
        else if (event.key === "ArrowUp") {
            if ((counter >= 1) && (counter <= (inputNumber + 1))) {
                counter -= 1;
                prevVal = document.getElementById(`input_p_${String(counter)}`).innerHTML;
                newInput.value = prevVal.replace(/\s+/g,' ').trim();
            }
        }
        else if (event.key === "ArrowDown") {
            if ((counter >= 0) && (counter <= (inputNumber - 1))) {
                counter += 1;
                prevVal = document.getElementById(`input_p_${String(counter)}`).innerHTML;
                newInput.value = prevVal.replace(/\s+/g,' ').trim();
            }
        }
    });
}

var inputNumber = 0;
PlaceFirstInputField(inputNumber);
var lastInput = document.getElementById(`input_field_${String(inputNumber)}`);
lastInput.tabIndex = 1;
lastInput.focus();
lastInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        ExecCodeIn(lastInput, inputNumber);
    }
});