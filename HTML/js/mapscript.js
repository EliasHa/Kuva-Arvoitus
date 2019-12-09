'use strict';
mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpYXNoYWoiLCJhIjoiY2szeW9rdjRlMG5zMTNtcWM5aHFvcjJiMSJ9.0KHgS7rc1xWuAGzD1HpFiQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [24.96, 60.19],
    zoom: 7
});

map.addControl(new mapboxgl.NavigationControl());