const screen = document.querySelector('#calcScreen');
const display = document.querySelector('#calcDisplay');
const erase = document.querySelector('#erase');
const history = document.querySelector('#history');
const equalsButton = document.querySelector('#equalsTo');
const addButton = document.querySelector('#add');
const clearAll = document.querySelector('#clearAll');
const specialButton = document.querySelector('#specialButton');
const buttonClass = document.getElementsByClassName('inputButton');
let operand1 = '';
let operand2 = '';
let result = '';

for (let i = 0; i< buttonClass.length; i++) {
  buttonClass[i].addEventListener('click', () => {
    display.textContent += parseInt(buttonClass[i].textContent);
})
}

equalsButton.addEventListener('click', () => {
  equalsTo();
})

addButton.addEventListener('click', () => {
  add();
})


specialButton.addEventListener('click', () => {
    display.textContent += specialButton.textContent;
})

erase.addEventListener('click', () => {
  let displayedNum = display.textContent;
  if (display.textContent.length > 1) {
    let erasedNUM = displayedNum.slice(0, -1)
    display.textContent = parseFloat(erasedNUM);
  } else {
    resetCalc();
  }
})

clearAll.addEventListener('click', () => {
  resetCalc();
})

function resetCalc() {
  display.textContent = '';
  while (history.firstChild) {
    history.removeChild(history.firstChild);
  }
}

function resetDisplay() {
  display.textContent = '';
}

function add() {
  let operand1 = document.createElement('li');
  let plusSign = document.createElement('li');
  plusSign.textContent = '+';
  let a = parseFloat(display.textContent);
  operand1.textContent = a;
  history.appendChild(operand1);
  history.appendChild(plusSign);
  resetDisplay();
}

function equalsTo() {
  let operand2 = document.createElement('li');
  let equalsSign = document.createElement('li');
  equalsSign.textContent = '=';
  let a = parseFloat(display.textContent);
  operand2.textContent = a;
  history.appendChild(operand2);
  history.appendChild(equalsSign);
  operate();
}

function operate() {
  let operand1 = parseFloat(history.children[0].textContent);
  let operator = history.children[1].textContent;
  let operand2 = parseFloat(history.children[2].textContent);
  let result = eval(operand1 + operator + operand2);
  resetDisplay();
  display.textContent = result;
}