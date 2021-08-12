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
        $criteriosVal=$v->getValoracion();
        $localidad=intval($v->getLocalidad());
        //De acuerdo a las reglas de valoracion (valoracionRules)
        //SEGURIDAD-----------------------------------------------------------------------------------------------
        if($criteriosVal['seguridad']=="seguro"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".seguro."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['seguridad']=="inseguro"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".inseguro."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['seguridad']=="muy inseguro"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".muy_inseguro."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['seguridad']=="peligroso"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".peligroso."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['seguridad']=="muy peligroso"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','1','".muy_peligroso."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }

        //SALUD-----------------------------------------------------------------------------------------------
        if($criteriosVal['salud']=="muy saludable"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".muy_saludable."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['salud']=="saludable"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".saludable."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['salud']=="no saludable"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".no_saludable."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['salud']=="perjudicial"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".perjudicial."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['salud']=="muy perjudicial"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','2','".muy_perjudicial."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }

        //AMBIENTE-----------------------------------------------------------------------------------------------
        if($criteriosVal['ambiente']=="muy agradable"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".muy_agradable."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['ambiente']=="agradable"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".agradable."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['ambiente']=="indiferente"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".indiferente."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['ambiente']=="desagradable"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".desagradable."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }
        else if($criteriosVal['ambiente']=="muy desagradable"){
            $this->dbo->consult("INSERT INTO `valoracionpunto` VALUES ('".$ultimoId[0]."','3','".muy_desagradable."', '', '".$localidad."', '".date('Y-m-d H:i:s')."')");
        }

        return [
            'saved' => true,
            'valoracion' => $v->getAll()
        ];
    }
}
