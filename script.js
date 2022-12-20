const display = document.querySelector(".display-input");

let first = 0;
let second = 0;
let clicked = false;
let displayValue = "";

window.addEventListener('load', function(){
    document.querySelector("body").classList.remove("preload");
})
createDisplay();

function removeTransition(e)
{
    this.classList.remove('num-down');
}

function createDisplay()
{
    const numberButtons = document.querySelectorAll(".num");
    numberButtons.forEach(number => {
        number.addEventListener('click', function()
        {
            displayValue += this.classList[2][4];
            console.log(displayValue);
            display.value = displayValue;
            number.classList.add("num-down");
        });
        numberButtons.forEach(number => {
            number.addEventListener('transitionend', removeTransition)
        })
    });

    const modButtons = document.querySelectorAll(".mods");
    let last = null;
    modButtons.forEach(mod => {
        mod.addEventListener('click', () => {
            if(last != null)
                last.classList.remove("mod-down");
            mod.classList.add("mod-down");
            last = mod;
        })
    })
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b ==0)
        return "Error no cookies";
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}