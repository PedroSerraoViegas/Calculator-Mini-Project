const screen = document.querySelector('#calcScreen');
const display = document.querySelector('#calcDisplay');
const erase = document.querySelector('#erase');
const clearAll = document.querySelector('#clearAll');
const specialButton = document.querySelector('#specialButton');
const buttonClass = document.getElementsByClassName('inputButton');

for (let i = 0; i< buttonClass.length; i++) {
  buttonClass[i].addEventListener('click', () => {
    display.textContent += parseInt(buttonClass[i].textContent);
})
}

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
}