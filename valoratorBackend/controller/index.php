<?php
// require_once '../model/DBOperator.php';
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
  if (isset($_POST) && isset($_POST['localidad'])) {
    $daoVal=new DAOValoracion();
    $status = $daoVal->save(new Valoracion($_POST));
    echo json_encode($status);
  } else {
    echo json_encode([
      'saved' => false,
      'message' => 'Campos Vacios',
      'valoracion' => null
    ]);
  }
} else if(isset($_GET['action']) && $_GET['action'] == 'consult') {

  $criterio=intval($_GET['criterio']);
  $consultor=new Consultor();
  $valoraciones = $consultor->getValoracionesLocalidades($criterio);
  echo json_encode($valoraciones);

} else {
  echo "???";
}


// updateTable();
// function updateTable()
// {
//   $dbo=new DBOperator(host, userName, dbName, password, charset);
//   $mysql = $dbo->getMysqlObj();
//   $localidades = $mysql->query('SELECT * FROM `localidades` ')->fetch_all(MYSQLI_ASSOC);
//   $valPunto = $mysql->query('SELECT * FROM `valoracionpunto` ')->fetch_all(MYSQLI_ASSOC);

//   foreach ($valPunto as $p) {
//     foreach ($localidades as $l) {
//       if (mb_strtolower($p['localidad'], 'UTF-8') == mb_strtolower($l['name'], 'UTF-8')) {
//         $mysql->query('UPDATE `valoracionpunto` SET `id_localidad` = '.$l['id'].' WHERE `valoracionpunto`.`idpunto` = '.$p['idpunto'].' AND `valoracionpunto`.`idcriterio` = '.$p['idcriterio']);
//         break;
//       }
//     }
//   }
// }
