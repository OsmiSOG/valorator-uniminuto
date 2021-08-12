<?php
class Valoracion{
  private $lat;
  private $long;
  private $valoracion;
  private $localidad;
  /**
  *El constructor recibe una cadena de la forma lat,long,criterio1=val1-criterio2=val2-criterio3=val3,localidad...
  */
  public function __construct(Array $data){
    $this->lat=$data['lat'];
    $this->long=$data['lng'];
    $this->valoracion= [
      'seguridad' => $data['seguridad'],
      'salud' => $data['salud'],
      'ambiente' => $data['ambiente'] 
    ];
    $this->localidad=intval($data['localidad']);
  }

  public function getLat(){
    return $this->lat;
  }
  public function setLat($lat){
    $this->lat=$lat;
  }

  public function getLong(){
    return $this->long;
  }
  public function setLong($long){
    $this->long=$long;
  }

  public function getValoracion(){
    return $this->valoracion;
  }
  public function setvaloracion($valoracion){
    $this->valoracion=$valoracion;
  }
  public function getLocalidad(){
    return $this->localidad;
  }
  public function setLocalidad($localidad){
    $this->localidad=$localidad;
  }

  public function getAll()
  {
    return [
      'lat' => $this->getLat(),
      'lng' => $this->getLong(),
      'localidad' => $this->getLocalidad(),
      'valoracion' => $this->getValoracion()
    ];
  }
}
