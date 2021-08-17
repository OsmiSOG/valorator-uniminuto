import L from "leaflet";
import alertify from "alertifyjs";

import {config} from "../config";

const map = L.map('map').setView([4.55452,-74.10107], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: config.accesTokenMapBox
}).addTo(map);

map.locate({
    setView: true,
    maxZoom: 12,
    enableHighAccuracy: true
})

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

function onLocationFound(e) {
    L.marker(e.latlng)
        .addTo(map)
        .bindPopup('Tu ubicación aproximadamente')
}

function onLocationError(e) {
    console.error(e);
    alertify.notify(e.message, 'error', 5, function () {});
}

export default map;