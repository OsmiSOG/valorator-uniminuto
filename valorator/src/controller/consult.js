import L from "leaflet";

import FormConsult from "view/FormConsult";
import gjLocalidadesData from "../data/poligonos-localidades.json";
import { debug, config } from "../config";

let myMap
let criterio = 0 //general

let gjLocalidades = L.geoJSON(gjLocalidadesData)
let info = L.control();
let legend = L.control({position: 'bottomright'});


info.onAdd = function (myMap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Valoracion de la Ciudad de Bogotá</h4>' + (props ?
        `<b> ${props.name_localidad} </b><br /> ${props.score_valoration}% Mejor | Calificado ${props.valorations_quantity} veces`
        : 'Hover over a localidad');
};

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 20, 40, 60, 80, 100].reverse(),
        labels = ['20%-0%','40%-20%','60%-40%','80%-60%','100%-80%'].reverse();

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < labels.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};


function template() {
    return FormConsult.toString();
}

function onChangeCriterio(e) {
    criterio = parseInt(e.target.value)
    updateDataValoration(criterio)
}

function updateDataValoration(criterio) {
    fetch(`${config[debug]}?action=consult&criterio=${criterio}`).then(res => res.json()).then(data => {
        gjLocalidades.remove();
        console.log(data);
        gjLocalidadesData.features.forEach(gjl => {
            data.forEach(l => {
                if (parseInt(gjl.properties['Identificador unico de la localidad']) === parseInt(l['id_localidad'])) {
                    gjl.properties = {
                        ...gjl.properties,
                        ...l
                    }
                    return;
                }
            });
        });
        console.log(gjLocalidadesData);
        gjLocalidades = L.geoJson(gjLocalidadesData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(myMap);
    })
}

function getColor(d) {
    return d > 100 ? '#FED976' :
           d > 80  ? '#FEB24C' :
           d > 60  ? '#FD8D3C' :
           d > 40  ? '#FC4E2A' :
           d > 20  ? '#E31A1C' :
           d > 0   ? '#BD0026' :'#BD0026';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.score_valoration),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    gjLocalidades.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    myMap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function init(map) {
    myMap = map
    info.addTo(myMap);
    legend.addTo(myMap);
    updateDataValoration(criterio)
    $('#criterioType').ready(() => {
        document.getElementById('criterioType').onchange = onChangeCriterio
    })
}


function destroy() {
    gjLocalidades.remove();
    info.remove();
    legend.remove();
}

export default {
    template: template(),
    init,
    destroy
}