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

   public function __construct($localidad = null){
      $this->daoVal=new DAOConsultarValoracion();
      $this->puntos=array();
      if (is_null($localidad)) {
         $this->localidad=$this->daoVal->getLocalidades();
      } else {
         $this->localidad = $localidad;
      }
      $this->valSeguridad=0;
      $this->valSalud=0;
      $this->valAmbiente=0;

   }

    public function getValoracionesLocalidades($criterio)
    {
      if ($criterio == 0) {
         return $this->calcularIndiceBienestar();
      }

      $valoraciones = $this->daoVal->calcularValoraciones($criterio);
      $localidadesFaltantes = $this->daoVal->getLocalidadesFaltantes($criterio);

      // var_dump($valoraciones);
      // die();
      if (!empty($localidadesFaltantes)) {
         foreach ($localidadesFaltantes as $l) {
            $valoracion = [
               'id_localidad' => $l['id'],
               'name_localidad' => $l['name'],
               'id_criterio' => $valoraciones[0]['id_criterio'],
               'name_criterio' => $valoraciones[0]['name_criterio'],
               'score_valoration' => 100,
               'valorations_quantity' => 0
            ];
            array_push($valoraciones, $valoracion);
         }
         return $valoraciones;
      } else {
         return $valoraciones;
      }
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
      $seguridad = $this->getValoracionesLocalidades(1);
      $salud = $this->getValoracionesLocalidades(2);
      $ambiente = $this->getValoracionesLocalidades(3);
      $valoraciones = array();

      for ($i=0; $i < count($this->localidad) ; $i++) {
         $ib=$importancias[0]*$seguridad[$i]['score_valoration']+ $importancias[1]*$salud[$i]['score_valoration']+ $importancias[2]*$ambiente[$i]['score_valoration'];
         
         $valoracion = [
            'id_localidad' => $seguridad[$i]['id_localidad'],
            'name_localidad' => $seguridad[$i]['name_localidad'],
            'id_criterio' => 0,
            'name_criterio' => 'General',
            'score_valoration' => $ib,
            'valorations_quantity' => $importancias[0]+$importancias[1]+$importancias[2]
         ];

         array_push($valoraciones, $valoracion);
      }

      return $valoraciones;
   }



 }