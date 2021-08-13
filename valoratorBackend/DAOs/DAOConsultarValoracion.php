<?php
require_once '../model/DBOperator.php';

class DAOConsultarValoracion{
  private $dbo;
  private $valoracion;

  public function __construct(){
    $this->dbo=new DBOperator(host, userName, dbName, password, charset);
    
  }

  public function getLocalidades()
  {
    $dboMysql = $this->dbo->getMysqlObj();
    return $dboMysql->query('SELECT * FROM localidades')->fetch_all(MYSQLI_ASSOC);;
  }

  public function getLocalidadesFaltantes($criterio)
  {
    $dboMysql = $this->dbo->getMysqlObj();
    return $dboMysql->query(' SELECT * FROM localidades 
      WHERE id NOT IN (SELECT id_localidad FROM valoracionpunto WHERE idcriterio = '.$criterio.' GROUP BY id_localidad)')
        ->fetch_all(MYSQLI_ASSOC);
  }
  
  public function calcularValoraciones($criterio)
  {
    $dboMysql = $this->dbo->getMysqlObj();
    $valoraciones = $dboMysql->query('SELECT localidades.id as id_localidad,
        localidades.name as name_localidad,
        criteriosvaloracion.id as id_criterio,
        criteriosvaloracion.nombre as name_criterio,
        SUM(valoracionpunto.valor) / COUNT(valoracionpunto.idpunto) as score_valoration,
        COUNT(*) AS valorations_quantity
      FROM valoracionpunto
      INNER JOIN localidades ON valoracionpunto.id_localidad = localidades.id
      INNER JOIN criteriosvaloracion ON valoracionpunto.idcriterio = criteriosvaloracion.id
      WHERE idcriterio = '.$criterio.' '.
      'GROUP BY id_localidad')->fetch_all(MYSQLI_ASSOC);
    
    $cant=$this->dbo->consult("SELECT `cantConsultas` FROM `criteriosvaloracion` WHERE `id`='".$criterio."'", "yes");
    $cant[0]++;
    $this->dbo->consult("UPDATE `criteriosvaloracion` SET `cantConsultas`='".$cant[0]."' WHERE `id`='".$criterio."'", "no");
    return $valoraciones;
  }

  public function consultarCantConsultasCriterio($idCriterio){
    $cant=$this->dbo->consult("SELECT `cantConsultas` FROM `criteriosvaloracion` WHERE `id`='".$idCriterio."'", "yes");
    return $cant[0];
  }

}
