const display = document.querySelector(".display-input");
const numberButtons = document.querySelectorAll(".num");
const modButtons = document.querySelectorAll(".mods");
const equalButton = document.querySelector(".btn-equal");
const clearButton = document.querySelector(".btn-clear");
const dotButton = document.querySelector(".btn-dot");



let first = 0;
let second = null;
let clicked = false;
let displayValue = "";
let curOperator = null;

window.addEventListener('load', function () {
	document.querySelector("body").classList.remove("preload");
})
displayNumbers();
displayMods();

clearButton.addEventListener('click', () => {
	first = 0;
	second = null;
	clicked = false;
	displayValue = "";
	curOperator = null;
	modButtons.forEach(mod => {
		mod.classList.remove("mod-down");
	})
	display.value = 0;
});


function removeTransition(e) {
	this.classList.remove('num-down');
}

function displayNumbers() {
	numberButtons.forEach(number => {
		number.addEventListener('click', function () {
			if (clicked && second == null) {
				first = parseFloat((""+displayValue).substring(0, 8));
				console.log(first);
				displayValue = "";
				second = 0;
				dotButton.disabled = false;
				
			}
			if (this.classList[2][4] == '.') {
				this.disabled = true;
			}
			if (displayValue.length < 7) {
				displayValue += this.classList[2][4];
				display.value = displayValue;
				number.classList.add("num-down");
			}
		});
		numberButtons.forEach(number => {
			number.addEventListener('transitionend', removeTransition)
		})
	});
}

function displayMods() {
	let last = null;
	modButtons.forEach(mod => {
		mod.addEventListener('click', () => {
			if (last != null)
				last.classList.remove("mod-down");
			if (mod.dataset.mod == '=') {
				displayEquals();
				last.classList.remove("mod-down");
				last = null;
			}
			else {
				if (second == null) {
					curOperator = mod.dataset.mod;
					last = mod;
					clicked = true;
				}
				else {
					displayEquals();
					last.classList.remove("mod-down");
					last = null;
				}
			}
			mod.classList.add("mod-down");
		})
	})
}

function displayEquals() {
	equalButton.addEventListener('transitionend', (e) => {
		if (e.propertyName == 'color' && equalButton.classList.contains("mod-down")) {
			equalButton.classList.remove("mod-down");
			second = parseFloat(display.value);
			second = operate(curOperator, first, second);
			display.value = first = displayValue = parseFloat(("" + second).substring(0, Math.min(8,
				("" + second).length)));
			console.log(first);
			second = null;
			clicked = false;
		}
	});
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
	if (b == 0)
		return "Error no cookies";
	return a / b;
}

function operate(operator, a, b) {
	switch (operator) {
		case '+':
			return add(a, b);
		case '-':
			return subtract(a, b);
		case '*':
			return multiply(a, b);
		case '/':
			return +divide(a, b).toFixed(6);
	}
}