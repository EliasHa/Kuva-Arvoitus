'use strict';
window.onload = function () {
    var marker;
    var guessButton = document.getElementById('guess-button');
    var guessStartTime = new Date().getTime();
    var timeDifference;
    guessButton.style.cursor = 'no-drop';

    var timer = setInterval(function () {
        var now = new Date().getTime();
        timeDifference = now - guessStartTime;
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        document.getElementById('guess-time').innerHTML = minutes + 'm ' + seconds + 's ';


    });

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
            guessButton.style.backgroundColor = '#94afbe';
            guessButton.onmouseover = hoverButton;
            guessButton.onmouseout = unHoverButton;
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

    function hoverButton() {
        guessButton.style.backgroundColor = '#708c9b';
    }

    function unHoverButton() {
        guessButton.style.backgroundColor = '#94afbe';
    }

    function printGuess() {
        console.log(JSON.stringify(marker.getLngLat()));
        console.log('guess time: ' + timeDifference);
        console.log('guess time: ' + Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)) + 'm ' + Math.floor((timeDifference % (1000 * 60)) / 1000) + 's ');
    }
};