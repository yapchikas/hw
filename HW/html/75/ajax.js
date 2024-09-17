(function () {
    'use strict'
    /*use globals*/
    const request = new XMLHttpRequest();

    function openFile(filePath) {
        document.getElementById('load').style.visibility = 'visible';
        fetch(`${filePath}`).then( r => (document.getElementById('load').style.visibility = 'hidden')
        
        
        // let button = $('#button');
        // let inputbox = $('#fileInput')
        // button.on('click', () => openFile(inputbox.value))

    
} ())