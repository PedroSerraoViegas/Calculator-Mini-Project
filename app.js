//VARIABLES N' STUFF
const screen = document.querySelector('#calcScreen');
const display = document.querySelector('#calcDisplay');
const erase = document.querySelector('#erase');
const history = document.querySelector('#history');
const equalsButton = document.querySelector('#equalsTo');
const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
const multiplyButton = document.querySelector('#multiply');
const divideButton = document.querySelector('#divide');
const clearAll = document.querySelector('#clearAll');
const clearEntry = document.querySelector('#clearEntry');
const specialButton = document.querySelector('#specialButton');
const buttonClass = document.getElementsByClassName('inputButton');
let operationExecuted = false;
let lastResult;


//EVENT LISTENERS
for (let i = 0; i < buttonClass.length; i++) {
  buttonClass[i].addEventListener('click', () => {
    if (operationExecuted === true && history.lastElementChild.textContent !== '=') {
      resetDisplay();
      operationExecuted = false;
    } else if (operationExecuted === true) {
      resetCalc();
      operationExecuted = false;
    }
    display.textContent += parseInt(buttonClass[i].textContent);
  })
}

equalsButton.addEventListener('click', () => {
  equalsTo();
})

addButton.addEventListener('click', () => {
  updateOperator('+')
  updateDisplay('+')
  if (history.firstElementChild === null || history.children.length === 4) {
    defineOperation('+');
  } else {
    doConsecutiveOperation();
  }
})

subtractButton.addEventListener('click', () => {
  updateOperator('-')
  updateDisplay('-')
  if (history.firstElementChild === null || history.children.length === 4) {
    defineOperation('-');
  } else {
    doConsecutiveOperation();
  }
})

multiplyButton.addEventListener('click', () => {
  updateOperator('*')
  updateDisplay('*')
  if (history.firstElementChild === null || history.children.length === 4) {
    defineOperation('*');
  } else {
    doConsecutiveOperation();
  }
})

divideButton.addEventListener('click', () => {
  updateOperator('/')
  updateDisplay('/')
  if (history.firstElementChild === null || history.children.length === 4) {
    defineOperation('/');
  } else {
    doConsecutiveOperation();
  }
})

specialButton.addEventListener('click', () => {
  if (display.textContent.indexOf('.') === -1) {
    display.textContent += specialButton.textContent;
  }
})

erase.addEventListener('click', () => {
  let displayedNum = display.textContent;
  if (display.textContent.length > 1) {
    let erasedNUM = displayedNum.slice(0, -1)
    display.textContent = erasedNUM;
    if (display.textContent === '-') {
      let erasedNUM = displayedNum.slice(0, -1)
      display.textContent = erasedNUM;
      resetCalc();
    }
  } else {
    resetCalc();
  }
})

clearAll.addEventListener('click', () => {
  resetCalc();
  operationExecuted = false;
})

clearEntry.addEventListener('click', () => {
  lastResult = parseFloat(display.textContent);
  resetDisplay();
  operationExecuted = false;
})

//RESETTING FUNCTIONS
function resetHistory() {
  while (history.firstChild) {
    history.removeChild(history.firstChild);
  }
}

function resetCalc() {
  operationExecuted = false;
  lastResult = '';
  resetDisplay();
  resetHistory();
}

function resetDisplay() {
  display.textContent = '';
}

//BEHAVIOR FUNCTIONS
function updateOperator(operator) {
  if (history.children.length >= 2 && history.children[1].textContent !== operator) {
    if (display.textContent !== '') {
      equalsTo();
    }
    history.children[1].textContent = operator;
  }
}

function updateDisplay(operator) {
  if (history.children.length === 4 && display.textContent === '') {
    history.removeChild(history.lastElementChild);
    history.removeChild(history.lastElementChild);
    history.children[0].textContent = lastResult;
    history.children[1].textContent = operator;
  }
}

function doConsecutiveOperation() {
  if (display.textContent !== '' && operationExecuted === false) {
    equalsTo();
    history.firstChild.textContent = display.textContent;
    history.removeChild(history.lastElementChild);
    history.removeChild(history.lastElementChild);
  }
}

//MATHEMATICAL OPERATIONS
function defineOperation(operator) {
  if (display.textContent !== '') {
    resetHistory();
    let operand1 = document.createElement('li');
    let operationSign = document.createElement('li');
    operationSign.textContent = operator;
    let a = parseFloat(display.textContent);
    operand1.textContent = a;
    history.appendChild(operand1);
    history.appendChild(operationSign);
    resetDisplay();
  }
}

function equalsTo() {
  if (history.children.length <= 3 && display.textContent !== '') {
    let operand2 = document.createElement('li');
    let equalsSign = document.createElement('li');
    equalsSign.textContent = '=';
    let a = parseFloat(display.textContent);
    operand2.textContent = a;
    history.appendChild(operand2);
    history.appendChild(equalsSign);
    operate();
  }
}

function operate() {
  let operand1 = parseFloat(history.children[0].textContent);
  let operator = history.children[1].textContent;
  let operand2 = parseFloat(history.children[2].textContent);
  let result = eval(operand1 + operator + operand2);
  resetDisplay();
  display.textContent = result;
  lastResult = result;
  operationExecuted = true;
}