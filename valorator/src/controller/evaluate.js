import L from "leaflet";
import leafletPip from "@mapbox/leaflet-pip";
import alertify from "alertifyjs";

import { debug, config } from "../config";
import FormEvaluate from "view/FormReg";

let myMap = null 
let popup = L.popup();

function template() {
    return FormEvaluate.toString();
}

function gjLayerLocalidades() {
    return fetch('https://raw.githubusercontent.com/OsmiSOG/valorator-uniminto/master/valorator/data/poligonos-localidades.geojson')
        .then(res => res.json())
}

function sendInfo(e) {
    e.preventDefault();
    let formData = new FormData(e.target)
    // let infoPoint=document.getElementById("lat").value+","+document.getElementById("long").value+","+document.getElementById("seguridad").value+"-"+document.getElementById("salud").value+"-"+document.getElementById("ambiente").value+","+localidadPunto;
    
    fetch(`${config[debug]}?action=savePoint`,{
        method: 'post',
        body: formData
    }).then(res => res.json()).then((data) => {
        if (data.saved) {
            alertify.notify('datos Guardados exitosamente', 'success', 5, function () {});
            e.target.reset();
        }
    })
}

function onMapClick(e) {
    let localidadPunto = "Outside From Bogota city";
    //Establecer a que localidad pertenece el punto elgido
    gjLayerLocalidades().then(data => {
        let gjLocalidades = L.geoJSON(data);
        let zone = leafletPip.pointInLayer(e.latlng, gjLocalidades)[0]

        localidadPunto = zone ? zone.feature.properties['Nombre de la localidad'] : localidadPunto;
        ///---------------------------------------------------
        popup
            .setLatLng(e.latlng)
            .setContent("Registre su percepción correspondiente a la ubicación:<br> Este punto pertenence a la localidad de "+ localidadPunto+"<br>Coords:" + e.latlng.toString())
            .openOn(myMap);

        document.getElementById('lat').value=e.latlng.lat.toString();
        document.getElementById('lng').value=e.latlng.lng.toString();
        document.getElementById('localidad').value=localidadPunto;
    })
        
}

function init(map) {
    myMap = map
    myMap.on('click', onMapClick)
    $('#formEvaluateMapPoint').ready(() => {
        document.getElementById('formEvaluateMapPoint').onsubmit = sendInfo
    })
}

export default {
    template: template(),
    init
}