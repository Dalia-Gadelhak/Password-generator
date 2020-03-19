//DOM ELEMENTS
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

//COPY PASSWORD TO CLIPBOARD
clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	//innerText property add content and get content
	if(!password) { return; } //nothing return nothing
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

generate.addEventListener('click', () => {
	const length = +lengthEl.value; // + SIGN OR parseInt() WILL CHANGE THE LENGTH TYPE FROM STING TO NUMBER
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//PASSWORD FUNCTION
function generatePassword(lower, upper, number, symbol, length) {
	//1.init password variable
	let generatedPassword = '';

	//2.filter out unchecked types
	const typesCount = lower + upper + number + symbol;

	//3.loop over length call generator function for each type
		//filter will filter out any item that is false
         //{ }to be the key
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]); 
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	//4. add final password to password var and return
	const finalPassword = generatedPassword.slice(0, length);
	return finalPassword;
}

//generator functions -http://www.net-comber.com/charset.html
//ONLY 26 letters in alphabet .. Code lowercase a =97.. Code Uppercase A=65.. Code 0 number = 48
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97); 
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}


// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});