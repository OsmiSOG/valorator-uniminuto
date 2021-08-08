var polygon=null;

var locDetector=new LocalidadDetector();

var todasLocalidades=getLocalidades();

const poligonsLocalidadesGeoJSON = null

var map = L.map('map').setView([4.6487,-74.1100], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1Ijoib3NtaXNvZyIsImEiOiJja3MzbjRwengwdGJxMnVxcTRmczhkbzd0In0.WhF86Hzw6_YMRcwsFMQXBg'
}).addTo(map);


var popup = L.popup();

fetch('../data/poligonos-localidades.geojson', {method: 'POST'}).then(res => res.json()).then(data => {
  console.log(data);
  L.geoJSON(data, {
    style: function (feature) {
      return {color: feature.properties.color};
    }
  }).bindPopup(function (layer) {
    return layer.feature.properties.description;
  }).addTo(map);
})

function onMapClick(e) {
  localidadPunto="---";
    //Establecer a que localidad pertenece el punto elgido
    for(k=0; k<todasLocalidades.length; k++){
      if(locDetector.establecerLocalidad(e.latlng.lat.toString(), e.latlng.lng.toString(),todasLocalidades[k])){
         localidadPunto=todasLocalidades[k].name;
         break;
      }

    }
    
    ///---------------------------------------------------
    popup
        .setLatLng(e.latlng)
        .setContent("Registre su percepción correspondiente a la ubicación:<br> Este punto pertenence a la localidad de "+localidadPunto+"<br>Coords:" + e.latlng.toString())
        .openOn(map);

    document.getElementById('lat').value=e.latlng.lat.toString();
    document.getElementById('long').value=e.latlng.lng.toString();
}

//Funciones de operación del mapa---
async function show(){
  var localidadName=document.getElementById('localidad').value;

  var valorationType=0;
  if(document.getElementById('valorationType').value==="Seguridad"){
    valorationType=1;
  }
  else if(document.getElementById('valorationType').value==="Salud"){
    valorationType=2;
  }
  else if(document.getElementById('valorationType').value==="Ambiente"){
    valorationType=3;
  }
  //Calcular Indice de Bienestar de la localidad
  else if(document.getElementById('valorationType').value==="General"){
    valorationType=0;
  }

  var pol=null;
  
  var colorValoracion="#000000";

  if(localidadName=="Usaquén"){
    //pol=Usaquen.coords;
    //pol=localidadesPoligonos[0];
    pol=Usaquen.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Chapinero"){
    pol=Chapinero.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Santa Fe"){
    pol=SantaFe.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="San Cristóbal"){
    pol=SanCristobal.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
    
  }
  else if(localidadName=="Usme"){
    pol=Usme.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Tunjuelito"){
    pol=Tunjuelito.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName==="Bosa"){
    pol=Bosa.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Kennedy"){
    pol=Kennedy.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Fontibón"){
    pol=Fontibon.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Engativá"){
    pol=Engativa.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Suba"){
    pol=Suba.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Barrios Unidos"){
    pol=BarriosUnidos.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Teusaquillo"){
    pol=Teusaquillo.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Los Mártires"){
    pol=LosMartires.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Antonio Nariño"){
    pol=AntonioNarino.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Puente Aranda"){
    pol=PuenteAranda.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="La Candelaria"){
    pol=LaCandelaria.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Rafael Uribe Uribe"){
    pol=RafaelUribeUribe.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Ciudad Bolívar"){
    pol=CiudadBolivar.coords;
    //Enviar solicitud de información al server sobre la localidad
    localidadEvaluacion=await sendConsult(localidadName, valorationType);
  }
  else if(localidadName=="Todas"){
    localidadEvaluacion=await sendConsult(Usaquen.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Usaquen.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Chapinero.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Chapinero.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(SantaFe.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(SantaFe.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(SanCristobal.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(SanCristobal.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Usme.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Usme.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Tunjuelito.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Tunjuelito.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Bosa.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Bosa.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Kennedy.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Kennedy.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Fontibon.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Fontibon.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Engativa.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Engativa.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Suba.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Suba.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(BarriosUnidos.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(BarriosUnidos.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(Teusaquillo.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(Teusaquillo.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(LosMartires.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(LosMartires.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(AntonioNarino.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(AntonioNarino.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(PuenteAranda.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(PuenteAranda.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(LaCandelaria.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(LaCandelaria.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(RafaelUribeUribe.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(RafaelUribeUribe.coords,{color: colorValoracion}).addTo(map);
    
    localidadEvaluacion=await sendConsult(CiudadBolivar.name, valorationType);
    colorValoracion=getColorToDraw(localidadEvaluacion);
    L.polygon(CiudadBolivar.coords,{color: colorValoracion}).addTo(map);
    
  }
  else if(localidadName==""){
    //document.getElementById("map").innerHTML.reload();
    map.removeLayer(L.polygon);
  }

  //Presentar los datos calculados en la sección de mensajes"
  if(localidadName!="Todas"){
    document.getElementById("mensajes").innerHTML="Localidad: "+localidadName+"<br>"+ "Valoración de "+ document.getElementById('valorationType').value +": "+localidadEvaluacion+"%";
  }
  else{
    document.getElementById("mensajes").innerHTML="El Indice de Binestar para la ciudad de Bogotá D.C. en estos momentos es de: "+ localidadEvaluacion+"%";
  }

  //---------------------------------------------------------

  /*
  L.marker([4.6487,-74.1100]).addTo(map)
      .bindPopup('Esta es una prueba de funcionamiento :D.')
      .openPopup();

      var circle = L.circle([4.6487,-74.1100], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.2,
          radius: 1500
      }).addTo(map);

*/

colorValoracion=getColorToDraw(localidadEvaluacion);

polygon = L.polygon(pol, {color: colorValoracion}).addTo(map);
     //L.polygon(pol).addTo(map);

}

function getColorToDraw(localidadEvaluacion){
  var colorValoracionV="000000";

  if(localidadEvaluacion>=80 && localidadEvaluacion<=100){
    colorValoracionV="#0d7ebb";
  }
  else if(localidadEvaluacion>=60 && localidadEvaluacion<=79.9999){
    colorValoracionV="#b5cd38";
  }
  else if(localidadEvaluacion>=40 && localidadEvaluacion<=59.9999){
    colorValoracionV="#f3a63a";
  }
  else if(localidadEvaluacion>=20 && localidadEvaluacion<=39.99999){
    colorValoracionV="#f44334";
  }
  else if(localidadEvaluacion>=0 && localidadEvaluacion<=19.9999){
    colorValoracionV="#ee156b";
  }

  return colorValoracionV;
}


//Fin de funciones de operación de mapa---

map.on('click', onMapClick);
