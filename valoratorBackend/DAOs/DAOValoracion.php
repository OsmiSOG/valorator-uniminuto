<?php
require_once '../model/DBOperator.php';
/**
 * Esta clase permite guardar en base de datos la valoración de un punto en función del ambiente. la seguridad y la salud
 */
class DAOValoracion{
  private $dbo;
  private $valoracion;

  public function __construct(){
    $this->dbo=new DBOperator(host, userName, dbName, password, charset);
    $this->valoracion=null;
  }

  /**
   * @param $v hace referencia a un objeto Valoracion
   */
  public function save($v){
    //guardar en base de datos
    $this->dbo->consult("INSERT INTO `coordenadas` VALUES ('0','".$v->getLat()."','".$v->getLong()."')");
    $ultimoId=$this->dbo->consult("SELECT MAX(id) FROM `coordenadas`", "yes");
    //Separar los criterios de valoracion obtenidos
    $criteriosVal=explode("-", $v->getValoracion());
    $localidad=$v->getLocalidad();
    //De acuerdo a las reglas de valoracion (valoracionRules)
    //SEGURIDAD-----------------------------------------------------------------------------------------------
    if($criteriosVal[0]=="seguro"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".seguro."','".$localidad."')");
    }
    else if($criteriosVal[0]=="inseguro"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".inseguro."','".$localidad."')");
    }
    else if($criteriosVal[0]=="muy inseguro"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".muy_inseguro."','".$localidad."')");
    }
    else if($criteriosVal[0]=="peligroso"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".peligroso."','".$localidad."')");
    }
    else if($criteriosVal[0]=="muy peligroso"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".muy_peligroso."','".$localidad."')");
    }

    //SALUD-----------------------------------------------------------------------------------------------
    if($criteriosVal[1]=="muy saludable"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".muy_saludable."','".$localidad."')");
    }
    else if($criteriosVal[1]=="saludable"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".saludable."','".$localidad."')");
    }
    else if($criteriosVal[1]=="no saludable"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".no_saludable."','".$localidad."')");
    }
    else if($criteriosVal[1]=="perjudicial"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".perjudicial."','".$localidad."')");
    }
    else if($criteriosVal[1]=="muy perjudicial"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".muy_perjudicial."','".$localidad."')");
    }

    //AMBIENTE-----------------------------------------------------------------------------------------------
    if($criteriosVal[2]=="muy agradable"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".muy_agradable."','".$localidad."')");
    }
    else if($criteriosVal[2]=="agradable"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".agradable."','".$localidad."')");
    }
    else if($criteriosVal[2]=="indiferente"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".indiferente."','".$localidad."')");
    }
    else if($criteriosVal[2]=="desagradable"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".desagradable."','".$localidad."')");
    }
    else if($criteriosVal[2]=="muy desagradable"){
        $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".muy_desagradable."','".$localidad."')");
    }

  }

}
