/**
 * Envío de datos de registro de valoración de un usuario sobre un punto de la ciudads en específico
 */
function sendInfo() { 
  //Cargar la información que va al servidor de Base de datos
  var infoPoint=document.getElementById("lat").value+","+document.getElementById("long").value+","+document.getElementById("seguridad").value+"-"+document.getElementById("salud").value+"-"+document.getElementById("ambiente").value+","+localidadPunto;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("mensajes").innerHTML = this.responseText;
    }
  };
  //xhttp.open("GET", "http://54.39.145.133/valoratorUNIMINUTO/valoratorBackend/controller/index.php?infoPoint="+infoPoint, true);
  xhttp.open("GET", "http://localhost/valoratorUNIMINUTO/valoratorBackend/controller/index.php?infoPoint="+infoPoint, true);
  xhttp.send();
}

/**
 * Funcción que permite enviar una petición sobre información de una localidad con respecto a un criterio de valoración
 * @param {*} localidadName 
 * @param {*} valororationType 
 */
function sendConsult(localidadName, valororationType){
  //Creación de promesa
  return new Promise(function(resolve, reject){
    //Cargar la información que va al servidor de Base de datos
    var datosLocalidad=localidadName+","+valororationType;
    var xhttp = new XMLHttpRequest();
    //xhttp.open("GET", "http://54.39.145.133/valoratorUNIMINUTO/valoratorBackend/controller/index.php?datosLocalidad="+datosLocalidad, true);
    xhttp.open("GET", "http://localhost/valoratorUNIMINUTO/valoratorBackend/controller/index.php?datosLocalidad="+datosLocalidad, true);

    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4){
          if(xhttp.status == 200) {
            //document.getElementById("mensajes").innerHTML = xhttp.responseText;
            resolve(xhttp.responseText);            
          }
          else{
            reject(new Error("Whoops!"));
          }
      }     
    }
    
    xhttp.send();

  })

}
function reject(){
  console.log(error);
}
