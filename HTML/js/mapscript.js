'use strict';
window.onload = function () {
    var marker;
    var guessButton = document.getElementById('guess-button');

    mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpYXNoYWoiLCJhIjoiY2szeW9rdjRlMG5zMTNtcWM5aHFvcjJiMSJ9.0KHgS7rc1xWuAGzD1HpFiQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [24.96, 60.19],
        zoom: 7
    });

    map.addControl(new mapboxgl.NavigationControl());


    map.on('click', function (e) {
        console.log('mousedown');
        if (marker === undefined){
            guessButton.style.cursor = 'pointer';
            guessButton.style.backgroundColor = '#add8e6';
            guessButton.onclick = printGuess;
            console.log('marker undefined');
            marker = new mapboxgl.Marker({
                draggable: true
            })
                .setLngLat(e.lngLat).addTo(map);
        } else {
            marker.setLngLat(e.lngLat);
        }

    });

    function printGuess() {
        console.log(JSON.stringify(marker.getLngLat()));
    }
};