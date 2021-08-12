<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require '../config/valoracionRules.php';
require '../config/config.php';
require '../model/Valoracion.php';
require '../DAOs/DAOValoracion.php';
require '../DAOs/DAOConsultarValoracion.php';
require '../model/Consultor.php';

if(isset($_GET['action']) && $_GET['action'] == 'savePoint') {
  if (isset($_POST)) {
    $daoVal=new DAOValoracion();
    $status = $daoVal->save(new Valoracion($_POST));
    echo json_encode($status);
  }
} else if(isset($_GET['action']) && $_GET['action'] == 'datosLocalidad') {

  $datosConsulta=explode(",", $_GET['datosLocalidad']);
  $consultor=new Consultor($datosConsulta[0]);
  $resp=0;
  if($datosConsulta[1]==1){
    $resp=$consultor->calcularValSeguridad();
  }
  else if($datosConsulta[1]==2){
    $resp=$consultor->calcularValSalud();

  }
  else if($datosConsulta[1]==3){
    $resp=$consultor->calcularValAmbiente();
  }
  else if($datosConsulta[1]==0){
    $resp=$consultor->calcularIndiceBienestar();
  }
  
  echo $resp;

} else {
  echo "???";
}
