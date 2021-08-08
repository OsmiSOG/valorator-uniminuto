<?php
require_once '../model/DBOperator.php';

class DAOConsultarValoracion{
  private $dbo;
  private $valoracion;

  public function __construct(){
    $this->dbo=new DBOperator(host, userName, dbName, password, charset);
    
  }

  /**
   * @param $localidad corresponde a un String con el nombre de la localidad a la que se quiere consultar
   * @param $criterio corresponde a un entero correspondiente al criterio que se quiere valorar 1=Seguridad, 2=Salud, 3=Ambiente
   * @return $resp corresponde a un array con las valoraciones almacenadas
   */
  public function consultar($localidad, $criterio){
    $resp=array();
    $resp=$this->dbo->consult("SELECT `valor` FROM `valoracionpunto` WHERE `localidad`='".$localidad."' AND `idCriterio`='".$criterio."'", "yes");

    //Actualizar la cantidad de consultas por criterio
    $cant=$this->dbo->consult("SELECT `cantConsultas` FROM `criteriosvaloracion` WHERE `id`='".$criterio."'", "yes");
    $cant[0]++;
    $this->dbo->consult("UPDATE `criteriosvaloracion` SET `cantConsultas`='".$cant[0]."' WHERE `id`='".$criterio."'", "no");

    return $resp;
  }

  public function consultarCantConsultasCriterio($idCriterio){
    $cant=$this->dbo->consult("SELECT `cantConsultas` FROM `criteriosvaloracion` WHERE `id`='".$idCriterio."'", "yes");
    return $cant[0];
  }

}
