const screen = document.querySelector('#calcScreen');
const display = document.querySelector('#calcDisplay');
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