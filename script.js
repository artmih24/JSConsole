function PlaceFirstInputField(inputNumber) {
    var main_div = document.getElementById("main_div");
    if (main_div != null) {
        const html = String.raw;
        main_div.innerHTML = html `
            <div class="input_div" id="input_div_${String(inputNumber)}">
                <textarea rows="1" cols="0" class="input_field" id="input_field_${String(inputNumber)}">
                </textarea>
            </div>
            <div class="separator_div" id="separator_div_${String(inputNumber)}">
            </div>
        `;
    }
}

function GetNewInputValLen(input) {
    var substrs = input.value.split(/\r\n|\r|\n/);
    var len = 0;
    substrs.forEach(function(item) {
        len = len > item.length ? len : item.length;
    });
    return len;
}

function newConsoleLog_V0() {
    var argsLen = arguments.length;
    var retVal = "";
    for (var i = 0; i < argsLen; i += 1) {
        retVal += arguments[i];
        retVal += " ";
    }
    return retVal;
}

function newConsoleLog() {
    var argsLen = arguments.length;
    var retVal = "";
    for (var i = 0; i < argsLen; i += 1) {
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

    var sep = document.getElementById(`separator_div_${String(inputNumber)}`);
    if (sep != null) {
        sep.style.backgroundColor = "#fff";
    }
    const html = String.raw;
    var inp_div = document.getElementById(`input_div_${String(inputNumber)}`);
    if (inp_div != null) {
        inp_div.innerHTML = html `
            <p class="input_p" id="input_p_${String(inputNumber)}">
                ${inp}
            </p>
        `;
    }
    var main_div = document.getElementById("main_div");
    if (main_div != null) {
        main_div.innerHTML += html `
            <div class="output_div" id="output_div_${String(inputNumber)}">
                <p class="output_p" id="output_p_${String(inputNumber)}">
                    ${ans}
                </p>
            </div>
            <div class="separator_div" id="separator_div_${String(inputNumber)}">
            </div>
            <div class="input_div" id="input_div_${String(inputNumber + 1)}">
                <textarea rows="1" cols="0" class="input_field" id="input_field_${String(inputNumber + 1)}">
                </textarea>
            </div>
            <div class="separator_div" id="separator_div_${String(inputNumber + 1)}">
            </div>
        `;
    }
    var brcount = (String(ans).match(/<br>/g) || []).length;
    if (brcount > 0) {
        var output_div = document.getElementById(`output_div_${String(inputNumber)}`);
        if (output_div != null) {
            output_div.style.height += `${24 + brcount * 30}px`;
        }
    }

    var newInput = document.getElementById(`input_field_${String(inputNumber + 1)}`);
    if (newInput != null) {
        newInput.value = "";
        newInput.tabIndex = 1;
        newInput.focus();
        var counter = inputNumber + 1;
        newInput.addEventListener("keyup", function(event) {
            var keysNotForIncreasingInputWidth = [
                "ArrowUp", 
                "ArrowDown", 
                "ArrowLeft", 
                "ArrowRight", 
                "Enter", 
                "Shift"
            ];
            if ((event.key === "Enter") && !event.shiftKey && (newInput != null)) {
                newInput.style.width = 'calc(100% - 48px)';
                newInput.style.overflow = 'hidden';
                ExecCodeIn(newInput, inputNumber + 1);
            }
            else if ((event.key === "Backspace") && (newInput != null)) {
                if (newInput.value.length > 0) {
                    newInput.cols = GetNewInputValLen(newInput);
                }
            }
            else if (!(keysNotForIncreasingInputWidth.includes(event.key)) && (newInput != null)) {
                newInput.cols = GetNewInputValLen(newInput);
            }
            else if ((event.key === "ArrowUp") && (newInput != null)) {
                if ((counter >= 1) && (counter <= (inputNumber + 1))) {
                    counter -= 1;
                    var prevInp = document.getElementById(`input_p_${String(counter)}`);
                    if (prevInp != null) {
                        var prevVal = prevInp.innerHTML;
                        newInput.cols = prevVal.length;
                        newInput.value = prevVal.replace(/\s+/g, ' ').trim();
                    }
                }
            }
            else if ((event.key === "ArrowDown") && (newInput != null)) {
                if ((counter >= 0) && (counter <= (inputNumber - 1))) {
                    counter += 1;
                    var prevInp = document.getElementById(`input_p_${String(counter)}`);
                    if (prevInp != null) {
                        var prevVal = prevInp.innerHTML;
                        newInput.cols = prevVal.length;
                        newInput.value = prevVal.replace(/\s+/g, ' ').trim();
                    }
                }
            }
        });
    }
}

var inputNumber = 0;
PlaceFirstInputField(inputNumber);

var firstInput = document.getElementById(`input_field_${String(inputNumber)}`);
if (firstInput != null) {
    firstInput.value = "";
    firstInput.tabIndex = 1;
    firstInput.focus();
    firstInput.addEventListener("keyup", function(event) {
        var keysNotForIncreasingInputWidth = [
            "ArrowUp", 
            "ArrowDown", 
            "ArrowLeft", 
            "ArrowRight", 
            "Enter", 
            "Shift"
        ];
        if ((event.key === "Enter") && !event.shiftKey && (firstInput != null)) {
            firstInput.style.width = 'calc(100% - 48px)';
            firstInput.style.overflow = 'hidden';
            ExecCodeIn(firstInput, inputNumber);
        }
        // else if ((event.key === "Enter") && event.shiftKey) {
        //     firstInput.rows = firstInput.value.split(/\r\n|\r|\n/).length;
        //     firstInput.style.height = `${24 + (firstInput.rows - 30) * 30}px`
        // }
        else if ((event.key === "Backspace") && (firstInput != null)) {
            if (firstInput.value.length > 0) {
                firstInput.cols = GetNewInputValLen(firstInput);
            }
        }
        else if (!(keysNotForIncreasingInputWidth.includes(event.key)) && (firstInput != null)) {
            firstInput.cols = GetNewInputValLen(firstInput);
        }
    });
}

var main_div = document.getElementById("main_div");
if (main_div != null) {
    main_div.addEventListener("click", function() {
        var lastInput = document.getElementsByClassName("input_field")[0];
        if (lastInput != null) {
            lastInput.tabIndex = 1;
            lastInput.focus();
        }
    });
}