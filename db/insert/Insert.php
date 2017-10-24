<?php 

class Insert {

    private $all = 'Select * from sia_';


    public function __construct($modulo,$datos){
        if($modulo != 'Volantes' && $modulo != 'VolantesDiversos'){
            $modulo = 'Cat'.$modulo;
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
        }else{
            $this->insertVolantes($modulo,$datos);
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

    public function insertVolantes($modulo,$datos){
        $this->separaDatosVolantesDocumentos($modulo,$datos);
       if($this->validaAuditoria($modulo,$datos)){
            if($this->validaFolio($datos)){
                $send=$this->separaDatosVolante($datos);
                if($modulo == 'VolantesDiversos'){
                    $sql = $this->insertQuery('Volantes',$send);
                }else{

                    $sql = $this->insertQuery($modulo,$send);
                }
                $pdo = $this->buildArrayPdo($send);
                if($this->InsertPdoTrueFalse($sql,$pdo)){
                    $send=$this->separaDatosVolantesDocumentos($modulo,$datos);
                    $sql = $this->insertQuery('VolantesDocumentos',$send);
                    $pdo = $this->buildArrayPdo($send);
                    $this->InsertPdo($sql,$pdo);
                }
            }
        }
        
    }

    public function separaDatosVolantesDocumentos($modulo,$datos){
       
        $sqlLastRegister=$this->getLastRegister('Volantes','idVolante','idVolante');
        $idVolante=$this->consultaSimple($sqlLastRegister);
        $idVolante=$idVolante[0]['idVolante'];
        if($modulo == 'Volantes'){

            $send=array(
                'idVolante' => $idVolante,
                'promocion' => $datos['promocion'],
                'cveAuditoria' => $datos['cveAuditoria'],
                'idSubTipoDocumento' => $datos['idSubTipoDocumento'],
                'notaConfronta' => $datos['notaConfronta']
            );
        }else{
            $send=array(
                'idVolante' => $idVolante,
                'idSubTipoDocumento' => $datos['idSubTipoDocumento'],
                'notaConfronta' => $datos['notaConfronta']
            );
        }
        return $send;
    }

    
    public function getLastRegister($tabla,$campo,$alias){
        $sql="select MAX($campo) as $alias from sia_".$tabla;
        return $sql;
    }

    public function consultaSimple($sql){
        $db=$this->conecta();
        $query=$db->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);

    }

    public function validaAuditoria($modulo,$datos){
       if($modulo == 'Volantes')
       {
           $send=array('idSubTipoDocumento'=>$datos['idSubTipoDocumento'], 
           'cveAuditoria'=>$datos['cveAuditoria'] );
           $res=$this->getRegisterControllerPhp('VolantesDocumentos',$send);
           if($res){return True;}else{
               $get=array('Error' => 'La Auditoria ya se encuentras asignada a un Documento');
               echo json_encode($get);
            }
        }else{
            return True;
        }
    }
        
    public function validaFolio($datos){
      
        $send=array('folio'=>$datos['folio'],'subFolio'=>$datos['subFolio'] );
        $res=$this->getRegisterControllerPhp('Volantes',$send);
        if($res){return True;}else{
            $get=array('Error' => 'El Numero de Folio Y SubFolio ya se encuentra Asignado');
            echo json_encode($get);
        }
    }
    public function separaDatosVolante($datos){
        $send=array(
            'idTipoDocto' => $datos['idTipoDocto'],
            'numDocumento' => $datos['numDocumento'],
            'fDocumento' => $datos['fDocumento'],
            'anexos' => $datos['anexos'],
            'fRecepcion' => $datos['fRecepcion'],
            'hRecepcion' => $datos['hRecepcion'],
            'idRemitente' => $datos['idRemitente'],
            'destinatario' => $datos['destinatario'],
            'asunto' => $datos['asunto'],
            'idCaracter' => $datos['idCaracter'],
            'idTurnado' => $datos['idTurnado'],
            'idAccion' => $datos['idAccion'],
            'folio' => $datos['folio'],
            'subFolio' => $datos['subFolio'],
            'extemporaneo' => $datos['extemporaneo']

        );
        return $send;
    }

    public function getRegisterControllerPhp($modulo,$datos){
        $sql=$this->getAllWhere($modulo,$datos,'AND','=');
        $arrayPdo=$this->buildArrayPdo($datos);
        $res=$this->consultaWhere($sql,$arrayPdo);
        if(!$res){
           return True;
        }else{
            return False;
        }
    }

    public function InsertPdoTrueFalse($sql,$pdo){
        $db=$this->conecta();
        try{
            $dbQuery=$db->prepare($sql);
            $pdo[':usrAlta']=$_SESSION ["idUsuario"];
            $dbQuery->execute($pdo);
             // $errores=$dbQuery->errorInfo();     
            //$insert=array('Error' => $errores);
            //echo json_encode($insert);
           return True;
        } catch(PDOException $e){
            $errores=$dbQuery->errorInfo();     
           return False;
        }
    }




}

?>