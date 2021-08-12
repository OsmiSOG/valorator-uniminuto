import L from "leaflet";
import leafletPip from "@mapbox/leaflet-pip";
import alertify from "alertifyjs";
import gjLocalidadesData from "../data/poligonos-localidades.json";

import { debug, config } from "../config";
import FormEvaluate from "view/FormReg";

let myMap = null 
let popup = L.popup();

function template() {
    return FormEvaluate.toString();
}

function sendInfo(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let localidad = formData.get('localidad');
    if (parseInt(localidad) === 0) {
        alertify.notify('Ubicación fuera de Bogotá no permitida', 'error', 5, function () {}); 
        return;  
    } 
    fetch(`${config[debug]}?action=savePoint`,{
        method: 'post',
        body: formData
    }).then(res => res.json()).then((data) => {
        if (data.saved) {
            alertify.notify('datos Guardados exitosamente', 'success', 5, function () {});
            popup.remove();
            e.target.reset();
        }
    })
}

function onMapClick(e) {
    let localidadName = "Outside From Bogota city";
    let localidadId = 0;
    //Establecer a que localidad pertenece el punto elgido
  
    let gjLocalidades = L.geoJSON(gjLocalidadesData);
    let zone = leafletPip.pointInLayer(e.latlng, gjLocalidades)[0];

    if (zone) {
        localidadName = zone.feature.properties['Nombre de la localidad'];
        localidadId = zone.feature.properties['Identificador unico de la localidad'];
    }
    ///---------------------------------------------------
    popup
        .setLatLng(e.latlng)
        .setContent("Registre su percepción correspondiente a la ubicación:<br> Este punto pertenence a la localidad de "+ localidadName+"<br>Coords:" + e.latlng.toString())
        .openOn(myMap);

    document.getElementById('lat').value=e.latlng.lat.toString();
    document.getElementById('lng').value=e.latlng.lng.toString();
    document.getElementById('localidadName').value=localidadName;
    document.getElementById('localidadId').value=localidadId;
        
}

function init(map) {
    myMap = map;
    myMap.on('click', onMapClick);
    $('#formEvaluateMapPoint').ready(() => {
        document.getElementById('formEvaluateMapPoint').onsubmit = sendInfo;
    })
}

function destroy() {
    myMap.off('click');
    popup.remove();
}

export default {
    template: template(),
    init,
    destroy
}