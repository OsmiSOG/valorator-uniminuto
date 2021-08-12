function FormConsult(){
  this.head="<div>";
  this.content='<div id="mensajes" class="messages">'+
  '</div>'+
  '<div class="formItem"><label for="valorationType">Tipo de valoración:</label><select id="valorationType">'+
  '<option>General</option>'+
  '<option>Seguridad</option>'+
  '<option>Salud</option>'+
  '<option>Ambiente</option>'+
  '</select></div>'+
  '<div class="formItem"><label for="localidad">Localidad:</label><select id="localidad">'+
  '<option></option>'+
  '<option>Todas</option>'+
  '<option>Usaquén</option>'+
  '<option>Chapinero</option>'+
  '<option>Santa Fe</option>'+
  '<option>San Cristóbal</option>'+
  '<option>Usme</option>'+
  '<option>Tunjuelito</option>'+
  '<option>Bosa</option>'+
  '<option>Kennedy</option>'+
  '<option>Fontibón</option>'+
  '<option>Engativá</option>'+
  '<option>Suba</option>'+
  '<option>Barrios Unidos</option>'+
  '<option>Teusaquillo</option>'+
  '<option>Los Mártires</option>'+
  '<option>Antonio Nariño</option>'+
  '<option>Puente Aranda</option>'+
  '<option>La Candelaria</option>'+
  '<option>Rafael Uribe Uribe</option>'+
  '<option>Ciudad Bolívar</option>'+
  '</select></div>';
  // '<div class="formItem"><label for="registros">Incluir registros:</label><select id="registros">'+
  // '<option>Sí</option>'+
  // '<option>No</option>'+

  // '</select></div>'+
  //'<div class="formItem"> <button id="actualizar">Actualizar Mapa</button> </div>';
  //'<div class="formItem"> <button id="registrarDatos">Registrar</button> </div>';
  this.footer="</div>";
}

FormConsult.prototype.setContent=function(content){
  this.content=content;
};

FormConsult.prototype.toString=function(){
  return this.head+this.content+this.footer;
};
