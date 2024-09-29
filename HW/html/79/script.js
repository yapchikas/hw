/*global $*/
(function () {

    'use strict';

    const gallery = $('.gallery');
    const input = $('#input');
    const button = $('#button');

    async function loadImages(userInput) {
        if (userInput === 'cats') {
            const catsJSON = await fetch('cats.json');
            const catsData = await catsJSON.json();
            gallery.empty();
            catsData.forEach((cat, index) => {
                gallery.append(` <div class="photo">
            <a href="images/cat${index + 1}.jpeg">
                <img src="${cat}" alt="cat photo">
            </a>
        </div>`);
            });
        }
        else if (userInput === 'dogs') {
            const dogsJSON = await fetch('dogs.json');
            const dogsData = await dogsJSON.json();
            gallery.empty();
            dogsData.forEach((dog, index) => {
                gallery.append(` <div class="photo">
            <a href="images/dog${index + 1}.jpeg">
                <img src="${dog}" alt="dog photo">
            </a>
        </div>`);
            });
        }
    }
    
    
    button.click(() => {
        loadImages(input.val().trim());
        input.val('');
    })

}());