function FormReg(){
  this.head="<div>";
  this.content='<div class="formItem"><label for="lat">Latitud:</label><input id="lat"  disabled></div>'+
  '<div class="formItem"><label for="long">Longitud:</label><input id="long"  disabled></div>'+
  '<div class="formItem"><label for="seguridad">Nivel de seguridad:</label><select id="seguridad">'+
  '<option>seguro</option>'+
  '<option>inseguro</option>'+
  '<option>muy inseguro</option>'+
  '<option>peligroso</option>'+
  '<option>muy peligroso</option>'+
  '</select></div>'+
  '<div class="formItem"><label for="salud">Nivel de afectación a la salud:</label><select id="salud">'+
  '<option>muy saludable</option>'+
  '<option>saludable</option>'+
  '<option>no saludable</option>'+
  '<option>perjudicial</option>'+
  '<option>muy perjudicial</option>'+
  '</select></div>'+
  '<div class="formItem"><label for="ambiente">Calidad del ambiente:</label><select id="ambiente">'+
  '<option>muy agradable</option>'+
  '<option>agradable</option>'+
  '<option>indiferente</option>'+
  '<option>desagradable</option>'+
  '<option>muy desagradable</option>'+
  '</select></div>'+
  '<div class="formItem"> <button id="registrarDatos">Registrar</button> </div>';
  //'<div class="formItem"> <button id="verInformacion">Ver información</button> </div>';
  this.footer="</div>";
}

FormReg.prototype.setContent=function(content){
  this.content=content;
};

FormReg.prototype.toString=function(){
  return this.head+this.content+this.footer;
};
