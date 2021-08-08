registrarInformacion();
document.getElementById('evaluar').addEventListener("click", toEvaluar);
document.getElementById('consultar').addEventListener("click", toConsultar);
document.getElementById('borrar').addEventListener("click", reload);

function verInfo() {
  var form=new FormConsult();
  document.getElementById('subcontent').innerHTML=form.toString();
  document.getElementById('registrarDatos').addEventListener("click", registrarInformacion);
  document.getElementById('localidad').addEventListener("mouseup", show);
  //document.getElementById('actualizar').addEventListener("click", show); //Función de map.js

}

function registrarInformacion(){
  var form=new FormReg();
  document.getElementById('subcontent').innerHTML=form.toString();
  document.getElementById('registrarDatos').addEventListener("click", sendInfo);
  //document.getElementById('verInformacion').addEventListener("click", verInfo);
}

function toEvaluar(){
  var form=new FormReg();
  document.getElementById('subcontent').innerHTML=form.toString();
  document.getElementById('registrarDatos').addEventListener("click", sendInfo);

}

function toConsultar(){
  var form=new FormConsult();
  document.getElementById('subcontent').innerHTML=form.toString();
  document.getElementById('localidad').addEventListener("mouseup", show);
  //document.getElementById('actualizar').addEventListener("click", show); //Función de map.js

}

function reload(){
  history.go(0);
}