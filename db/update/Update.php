<?php 


class Update{
    
    private $all = 'Select * from sia_';

    public function __construct($modulo,$datos){

        if($this->validaDatos($datos)){

           $sql = $this->isExistRegister($modulo,$datos);
           if($sql){
               $where=$this->getDataWhereQuery($datos);
               $valuesQuery=$this->deleteLastRegisterPdo($datos);
               $sql=$this->updateQuery($modulo,$valuesQuery,$where);
               $pdo = $this->buildArrayPdo($datos);
               $this->UpdatePdo($sql,$pdo);
            }else{
                $insert=array('Error' => 'Registro Duplicado');
                echo json_encode($insert);
            }
            
        }
    }

    public function validaDatos($datos){
        $cont=0;
        foreach($datos as $llave => $valor ){
            if($llave != 'subFolio'){
                if(empty($valor)){
                    
                    return False;
                }
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

    public function getDataWhereQuery($campos){
       end($campos);
       $llave=key($campos);
       $valor=end($campos);
       return $datos=array($llave => $valor);
    }

    public function deleteLastRegisterPdo($datos){
        end($datos);
        $llave=key($datos);
        unset($datos[$llave]);
        return $datos;
    }

    public function updateFile($modulo,$datos){
        $where=$this->getDataWhereQuery($datos);
        $valuesQuery=$this->deleteLastRegisterPdo($datos);
        $sql=$this->updateQuery($modulo,$valuesQuery,$where);
        $pdo = $this->buildArrayPdo($datos);
        $update = new UpdateModel();
        $update->UpdatePdo($sql,$pdo);
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

    public function updateQuery($tabla,$datos,$datosWhere){
        
        if($tabla != 'Volantes' && $tabla != 'ObservacionesDoctosJuridico' && $tabla!='DocumentosSiglas' && $tabla != 'confrontasJuridico' ){
            $tabla = 'Cat'.$tabla;
        }
        $campos=$this->buildValuesQueryUpdate($datos);
        $where=$this->buildFieldsWhere($datosWhere,'AND','=');
        $sql='UPDATE sia_'.$tabla.' SET '.$campos.', usrModificacion=:usrModificacion,fModificacion=getdate() WHERE '.$where;
        
        return $sql;
    }

    public function UpdatePdo($sql,$pdo){
        $db=$this->conecta();
        try{
            $dbQuery=$db->prepare($sql);
            $pdo[':usrModificacion']=$_SESSION ["idUsuario"];
            $dbQuery->execute($pdo);
            //$insert=array('Success' => 'Success');
            $errores=$dbQuery->errorInfo();     
            $insert=array('Error' => $errores);
            echo json_encode($insert);
            
        } catch(PDOException $e){
            $errores=$dbQuery->errorInfo();     
            $insert=array('Error' => $errores);
            echo json_encode($insert);
        }
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

    public function buildValuesQueryUpdate($campos){
        $cadena='';
        foreach ($campos as $key => $value) {
            $cadena=$cadena.$key.'=:'.$key.',';
        }
        $cadena=rtrim($cadena,',');
        return $cadena;
    }



}


?>