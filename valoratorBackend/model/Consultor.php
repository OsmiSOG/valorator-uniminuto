<?php
/**
 *Esta clase permite calcular la valoración de una localidad de la ciudad en función de un criterio de valoración y los valores de los puntos registrados en dicha localidad
 */

 class Consultor{
    private $puntos;
    private $localidad;
    private $valSeguridad;
    private $valSalud;
    private $valAmbiente;
    private $daoVal;

    public function __construct($localidad){
       $this->puntos=array();
       $this->localidad=$localidad;
       $this->valSeguridad=0;
       $this->valSalud=0;
       $this->valAmbiente=0;

       $this->daoVal=new DAOConsultarValoracion();
    }

    public function calcularValSeguridad(){
       //Cargar valores obtenidos en seguridad dentro de la localidad
       $r=$this->daoVal->consultar($this->localidad, 1);       
       //Calcular el promedio de valores de seguridad dentro de la localidad
       $promSe=0;
       for($i=0; $i<count($r); $i++){
          $promSe+=$r[$i];
       }
       return $promSe/count($r);
   }

    public function calcularValSalud(){
        //Cargar valores obtenidos en seguridad dentro de la localidad
        $r=$this->daoVal->consultar($this->localidad, 2);       
        //Calcular el promedio de valores de seguridad dentro de la localidad
        $promSa=0;
        for($i=0; $i<count($r); $i++){
           $promSa+=$r[$i];
        }
        return $promSa/count($r);

    }

    public function calcularValAmbiente(){
        //Cargar valores obtenidos en seguridad dentro de la localidad
        $r=$this->daoVal->consultar($this->localidad, 3);       
        //Calcular el promedio de valores de seguridad dentro de la localidad
        $promA=0;
        for($i=0; $i<count($r); $i++){
           $promA+=$r[$i];
        }
        return $promA/count($r);

   }

   /**
    * Este método permite obtener los grados de importancia de los criterios de valoración en función de las consultas de los ciudadanos
    * @return $importacias Retorna un array con los valores de importancia (entre 0 y 1) de cada uno de los criterios
    */
   public function getGradoImportaciaCriterios(){
      $se=0;
      $sa=0;
      $a=0;
      $importancias=array();
      //Establecer la importacia de los valores de seguridad.
       //-Cant de consultas de seguridad
       $se=$this->daoVal->consultarCantConsultasCriterio(1);
       //-Cant de consultas de salud
       $sa=$this->daoVal->consultarCantConsultasCriterio(2);
       //-Cant de consultas de ambiente
       $a=$this->daoVal->consultarCantConsultasCriterio(3);

       $totalConsultas=$se+$sa+$a;

       $importancias[]=$se/$totalConsultas; //Importancia de la seguridad
       $importancias[]=$sa/$totalConsultas; //Importancia de la salud
       $importancias[]=$a/$totalConsultas; //Importancia del ambiente
       
       return $importancias;
   }

   public function calcularIndiceBienestar(){
       //Calcular el grado de importancia de la seguridad
       $importancias=$this->getGradoImportaciaCriterios();
       $ib=$importancias[0]*$this->calcularValSeguridad()+ $importancias[1]*$this->calcularValSalud()+ $importancias[2]*$this->calcularValAmbiente();

       return $ib;
   }



 }