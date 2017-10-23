<?php 

class Insert {

    private $all = 'Select * from sia_';


    public function __construct($modulo,$datos){
        if($modulo != 'Volantes'){
            $modulo = 'Cat'.$modulo;
        }
        if($this->validaDatos($datos)){
            $sql = $this->isExistRegister($modulo,$datos);
            if($sql){
                $sql = $this->insertQuery($modulo,$datos);
                $pdo = $this->buildArrayPdo($datos);
                $this->InsertPdo($sql,$pdo);
             }else{
                 $insert = array('Error' => 'Registro Duplicado');
                 echo json_encode($insert);
             }
             
         }
    }


    public function conecta(){
        try{
            require_once 'juridico/db/rutasAbsolutas.php';
            $rutas = new RutasAbsolutas();
            $rutas = $rutas->rutas();
            require $rutas['conexion'];
            $db = new PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
            return $db;
        }catch (PDOException $e) {die();}
    }

    public function validaDatos($datos){
        $cont=0;
        foreach($datos as $llave => $valor ){
           if(empty($valor)){
               return False;
           }
        }
        return True;
    }

    public function isExistRegister($modulo,$datos){
        $sql=$this->getAllWhere($modulo,$datos,'AND','=');
        $arrayPdo=$this->buildArrayPdo($datos);
        $res=$this->consultaWhere($sql,$arrayPdo);
        
          if(!$res){
              return True;
          }else{
              return False;
          }
    }


    public function getAllWhere($tabla,$campos,$logico,$igualador){
        $sql=$this->all.$tabla.' Where ';
        $fields=$this->buildFieldsWhere($campos,$logico,$igualador);
        return $sql.$fields;

    }


    public function buildArrayPdo($datos){
        $arreglo=array();
        foreach ($datos as $key => $value) {
            $arreglo[':'.$key]=$value;
        }
        return $arreglo;
    }

    public function consultaWhere($sql,$pdo){
        $db=$this->conecta();
        try{

            $query=$db->prepare($sql);
            $query->execute($pdo);
            $res=$query->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($res)){
                return $res;
            }else{
                return False;
                
            }
        } catch(PDOException $e){
            $errores=$query->errorInfo();   
            $get=array('Error' => $errores);
            echo json_encode($get);
        }
    }


    
    public function InsertPdo($sql,$pdo){
        $db=$this->conecta();
        try{
            $dbQuery=$db->prepare($sql);
            $pdo[':usrAlta']=$_SESSION ["idUsuario"];
            $dbQuery->execute($pdo);
            $insert=array('Success' => 'Success');
            echo json_encode($insert);
           // $errores=$dbQuery->errorInfo();     
            //$insert=array('Error' => $errores);
            //echo json_encode($insert);
        } catch(PDOException $e){
            $errores=$dbQuery->errorInfo();     
            $insert=array('Error' => $errores);
            echo json_encode($insert);
        }
    }

    public function insertQuery($tabla,$datos){
        $campos=$this->buildFields($datos);
        $queryVal=$this->buildPdoValuesQueryInsert($datos);
        $sql='INSERT INTO sia_'.$tabla.'('.$campos.',usrAlta,fAlta) Values ('.$queryVal.',:usrAlta,getdate())';
        return $sql;
    }

    public function buildFields($campos){
        $cadena='';
        foreach($campos as $key => $valor){
            $cadena=$cadena.$key.',';
        }
        $cadena=rtrim($cadena,',');
        return $cadena;
    }

    public function buildPdoValuesQueryInsert($campos){
        $cadena='';
        foreach ($campos as $key => $value) {
            $cadena=$cadena.':'.$key.',';
        }
        $cadena=rtrim($cadena,',');
        return $cadena;
    }

    public function buildFieldsWhere($campos,$logico,$igualador){
        $cadena='';
        foreach($campos as $key => $valor){
            $cadena=$cadena.$key.$igualador.':'.$key.' '.$logico.' ';
        }
        $cadena=rtrim($cadena,' ');
        $cadena=rtrim($cadena,$logico);
        return $cadena;

    }

}

?>