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

if(isset($_GET['infoPoint'])){
  $daoVal=new DAOValoracion();
  $daoVal->save(new Valoracion($_GET['infoPoint']));
}
else if(isset($_GET['datosLocalidad'])){
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


  // $r=null;
  // $datosConsulta=explode(",", $_GET['datosLocalidad']);
  // $daoVal=new DAOConsultarValoracion();
  // $r=$daoVal->consultar($datosConsulta[0], $datosConsulta[1]);
  // if($r!=null){
  //   echo $r[0];
  // }
  // else{
  //   echo "no hay valoración";
  // }
  

}


else{
  echo "???";
}
