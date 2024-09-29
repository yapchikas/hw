/* global $*/
const list = $('#results-list');
const searchBox = $('#search-box');
const searchButton = $('#search-btn');
let currentInfoWindow = null;

async function getSearchResults(input) {
    const resultsJSON = await fetch(`http://api.geonames.org/wikipediaSearch?q=${input}&maxRows=10&username=avrahamkatz&type=json`);
    const data = await resultsJSON.json();
    const results = data.geonames;
    list.empty();
    results.forEach(e => {

        list.append(`
            <li>
            <img src=${e.thumbnailImg} alt=${e.title}>
                        <div class="result-info">
                            <h3 class="result-title">${e.title}</h3>
                            <p class="summary">
                           ${e.summary}
                           <a href= "https://${e.wikipediaUrl}" target="_blank" id="open-wiki">Open Wiki</a>
                            </p>
                        </div>
                    </li>`);

    });
    displayMap(results);
}

searchButton.click(() => {
    if (searchBox.val() !== '') {
        getSearchResults(`${searchBox.val()}`);
        searchBox.val('');
    }
});

async function displayMap(array) {
    // eslint-disable-next-line no-undef
    const { Map } = await google.maps.importLibrary('maps');
    // eslint-disable-next-line no-undef
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    let position = { lat: 39.16704497476413, lng: -100.36819943947745 };

    const map = new Map(document.getElementById('map'), {
        zoom: 4,
        center: position,
        mapId: 'DEMO_MAP_ID',
    });

    array.forEach(e => {
        position = { lat: e.lat, lng: e.lng };
        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: 'click to see info',
        });
        let infoWindow = new google.maps.InfoWindow({
            content: `<img src="${e.thumbnailImg}" alt="${e.title}"><h3>${e.title}</h3><p>${e.summary}</p><a href= "https://${e.wikipediaUrl}" target="_blank">Open Wiki</a>`,
        });

        // Add an event listener to the marker to open the InfoWindow on click
        marker.addListener('click', () => {
            if (map.zoom < 6) {
                map.zoom = 6;
            }
            openCloseWindow(map, marker, infoWindow);

        });
    });
}

function openCloseWindow(map, marker, infoWindow) {
    if (infoWindow !== currentInfoWindow) {
        currentInfoWindow?.close();
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
    }
    else {
        currentInfoWindow?.close();
        currentInfoWindow = null;
    }
}