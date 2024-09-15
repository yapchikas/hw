(function () {
    'use strict'
    /*use globals*/
    const request = new XMLHttpRequest();

    function openFile(filePath) {
        document.getElementById('load').style.visibility = 'visible';
        request.open('GET', `${filePath}`);
        request.send();


        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                document.getElementById('load').style.visibility = 'hidden';
                {
                    if (request.status < 400) {
                        console.log(request.responseText);
                    } else {
                        console.error('oops', request.status);
                    }
                }

            }
        }
}
        let button = $('#button');
        let inputbox = $('#fileInput')
        button.on('click', () => openFile(inputbox.value))

    
} ())