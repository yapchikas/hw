(function () {
    'use strict';
    const button1 = document.querySelector('.buttons');
    let button = 1
    button1.addEventListener( 'click', createButton)
    
    function createButton() 
    {
    const myNewButton = document.createElement('button');
    myNewButton.textContent = ++button;
    document.body.appendChild(myNewButton)
    myNewButton.className = 'buttons'
    myNewButton.addEventListener('click', createButton)
    }
}());
