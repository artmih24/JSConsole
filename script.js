function PlaceFirstInputField(inputNumber) {
    const html = String.raw;
    document.getElementById("main_div").innerHTML = html `
        <div class="input_div" id="input_div_${String(inputNumber)}">
            <textarea rows="1" cols="1" class="input_field" id="input_field_${String(inputNumber)}">
            </textarea>
        </div>
        <div class="separator_div" id="separator_div_${String(inputNumber)}">
        </div>
    `;
}

function newConsoleLog_V0() {
    var argsLen = arguments.length;
    var retVal = "";
    for (i = 0; i < argsLen; i += 1) {
        retVal += arguments[i];
        retVal += " ";
    }
    return retVal;
}

function newConsoleLog() {
    var argsLen = arguments.length;
    var retVal = "";
    for (i = 0; i < argsLen; i += 1) {
        retVal += arguments[i];
        retVal += " ";
    }
    const html = String.raw;
    retVal += html `<br> undefined`;
    return retVal;
}

function ExecCodeIn(input, inputNumber) {
    var inp = input.value;
    var logBackup = console.log;
    console.log = newConsoleLog;
    var ans = eval(input.value);
    console.log = logBackup;

    const html = String.raw;
    document.getElementById(`separator_div_${String(inputNumber)}`).style.backgroundColor = "#fff";
    document.getElementById(`input_div_${String(inputNumber)}`).innerHTML = html `
        <p class="input_p" id="input_p_${String(inputNumber)}">
            ${inp}
        </p>
    `;
    document.getElementById("main_div").innerHTML += html `
        <div class="output_div" id="output_div_${String(inputNumber)}">
            <p class="output_p" id="output_p_${String(inputNumber)}">
                ${ans}
            </p>
        </div>
        <div class="separator_div" id="separator_div_${String(inputNumber)}">
        </div>
        <div class="input_div" id="input_div_${String(inputNumber + 1)}">
            <textarea rows="1" cols="1" class="input_field" id="input_field_${String(inputNumber + 1)}">
            </textarea>
        </div>
        <div class="separator_div" id="separator_div_${String(inputNumber + 1)}">
        </div>
    `;
    var brcount = (String(ans).match(/<br>/g) || []).length;
    if (brcount > 0) {
        document.getElementById(`output_div_${String(inputNumber)}`).style.height += `${24 + brcount * 30}px`;
    }

    var newInput = document.getElementById(`input_field_${String(inputNumber + 1)}`);
    newInput.tabIndex = 1;
    newInput.focus();
    var counter = inputNumber + 1;
    newInput.addEventListener("keyup", function(event) {
        var keysNotForIncreasingInputWidth = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"];
        if ((event.key === "Enter") && !event.shiftKey) {
            newInput.style.width = 'calc(100% - 48px)';
            newInput.style.overflow = 'hidden';
            ExecCodeIn(newInput, inputNumber + 1);
        }
        else if (event.key === "Backspace") {
            newInput.cols = newInput.value.length;
        }
        else if (!(keysNotForIncreasingInputWidth.includes(event.key))) {
            newInput.cols = newInput.value.length;
        }
        else if (event.key === "ArrowUp") {
            if ((counter >= 1) && (counter <= (inputNumber + 1))) {
                counter -= 1;
                prevVal = document.getElementById(`input_p_${String(counter)}`).innerHTML;
                newInput.cols = prevVal.length;
                newInput.value = prevVal.replace(/\s+/g, ' ').trim();
            }
        }
        else if (event.key === "ArrowDown") {
            if ((counter >= 0) && (counter <= (inputNumber - 1))) {
                counter += 1;
                prevVal = document.getElementById(`input_p_${String(counter)}`).innerHTML;
                newInput.cols = prevVal.length;
                newInput.value = prevVal.replace(/\s+/g, ' ').trim();
            }
        }
    });
}

var inputNumber = 0;
PlaceFirstInputField(inputNumber);

var firstInput = document.getElementById(`input_field_${String(inputNumber)}`);
firstInput.tabIndex = 1;
firstInput.focus();
firstInput.addEventListener("keyup", function(event) {
    var keysNotForIncreasingInputWidth = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"];
    if ((event.key === "Enter") && !event.shiftKey) {
        firstInput.style.width = 'calc(100% - 48px)';
        firstInput.style.overflow = 'hidden';
        ExecCodeIn(firstInput, inputNumber);
    }
    // else if ((event.key === "Enter") && event.shiftKey) {
    //     firstInput.rows = firstInput.value.split(/\r\n|\r|\n/).length;
    //     firstInput.style.height = `${24 + (firstInput.rows - 30) * 30}px`
    // }
    else if (event.key === "Backspace") {
        firstInput.cols = firstInput.value.length;
    }
    else if (!(keysNotForIncreasingInputWidth.includes(event.key))) {
        firstInput.cols = firstInput.value.length;
    }
});

document.getElementById("main_div").addEventListener("click", function() {
    var lastInput = document.getElementsByClassName("input_field")[0];
    lastInput.tabIndex = 1;
    lastInput.focus();
});