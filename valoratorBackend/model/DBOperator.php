<?php
/****************************************************************************************************************
/*Esta clase permite consultar, guardar, actualizar y eliminar campos en tablas de una base de datos usando MySQL
/*Desarrollada por frimost(Armandux)
/*Para englinx.net
/*Ultima actualizacion 03/02/2016
/****************************************************************************************************************/
class DBOperator{
	//Atributos------------------------
	private $host; //Nombre del hosting donde esta la base de datos
	private $dbName; //Nombre de la base de datos
	private $userName; //Nombre del usuario autorizado
	private $password; //La clave de ese usuario para tener acceso
        
        private $mysqliObj; //Objeto ejecutor de procesos de conexión y consulta
        private $charset; //Set de caracteres aplicable a las consultas (Por lo general utf8) 
	//Fin de Atributos-----------------

	//Constructor y Destructor--------
	function __construct($host="localhost", $userName="root", $dbName="", $password="", $charset="utf8"){
		$this->host=$host;
		$this->dbName=$dbName;
		$this->userName=$userName;
		$this->password=$password;
                
                $this->mysqliObj=new mysqli($this->host, $this->userName, $this->password, $this->dbName);
                $this->charset=$charset;
                $this->mysqliObj->query("SET NAMES '".$this->charset."'");
	}
	//fin Constructor
        
        //gets y sets-----------------------
	function setHost($host=""){
		$this->host=$host;
	}
	function setDbName($dbName=""){
		$this->dbName=$dbName;
	}
	function setUserName($userName=""){
		$this->userName=$userName;
	}
	function setPassword($password=""){
		$this->password=$password;
	}
        function setCharset($charset=""){
		$this->charset=$charset;
	}
		
	function getHost(){
		return $this->host;
	}
	function getDbName(){
		return $this->dbName;
	}
	function getUserName(){
		return $this->userName;
	}
	function getPassword(){
		return $this->password;
	}
        function getCharset(){
		return $this->charset;
	}
	
	
	//Fin Gets y Sets-------------------
	
	function consult($mySqlOrder="", $capture="no"){
		$consult=$this->mysqliObj->query($mySqlOrder);
	    if (!$consult) {
			printf("Error: %s\n", $this->mysqliObj->error);
		}

		//Si se desea capturar datos desde la base de datos
		if ($capture=="yes"){
			$rowValues=Array();
			while ($linea = mysqli_fetch_array($consult,MYSQLI_ASSOC)) {
				foreach ($linea as $valor_col) {
					$rowValues[]=$valor_col;
				}
			}
			//Reiniciar el objeto mySqli para garantizar su uso en varias consultas simultáneas :D----
			$this->mysqliObj=new mysqli($this->host, $this->userName, $this->password, $this->dbName);
			$this->mysqliObj->query("SET NAMES '".$this->charset."'");
			//----------------------------------------------------------------------------------------
			return $rowValues;	
		}
            
	}
        
	function close(){
		$this->mysqliObj->close();
	}
	
}
