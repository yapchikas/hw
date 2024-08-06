(function(){
'use strict'

let colorInterval;
let isColorChanging = false;
const button = document.querySelector('.button');
button.addEventListener('click', toggleColorChange)

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function changeColors() {
    document.body.style.backgroundColor = getRandomColor();
    document.body.style.color = getRandomColor();
}

function toggleColorChange() {
    
    if (isColorChanging) {
        clearInterval(colorInterval);
        button.textContent = 'Start Color Change';
    } else {
        colorInterval = setInterval(changeColors, 1000);
        button.textContent = 'Stop Color Change';
    }
    isColorChanging = !isColorChanging;
}
}());