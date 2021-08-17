import L from "leaflet";
import leafletPip from "@mapbox/leaflet-pip";
import gjLocalidadesData from "./data/poligonos-localidades.json";

let gjLocalidades = L.geoJSON(gjLocalidadesData);

export default function searchZone(lng, lat) {
    let zone = leafletPip.pointInLayer([lng, lat], gjLocalidades)[0];
    console.log(zone);
}

