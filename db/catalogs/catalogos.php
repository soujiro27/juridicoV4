<?php 

class Catalogos{
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

    public function getTiposDocumentos(){
        $db = $this->conecta();
        $query = "select idTipoDocto,nombre,estatus from sia_tiposdocumentos where estatus='ACTIVO' and tipo='JURIDICO'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    public function getSubTiposDocumentos(){
        $db = $this->conecta();
        $query = "select idSubTipoDocumento,idTipoDocto,nombre,estatus from sia_catSubTiposDocumentos where estatus='ACTIVO'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    
    public function getCaracteres(){
        $db = $this->conecta();
        $query = "select idCaracter,nombre from sia_catCaracteres where estatus='ACTIVO'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    public function getTurnados(){
        $db = $this->conecta();
        $query = "select idArea,nombre from sia_areas where idAreaSuperior = 'DGAJ' and estatus = 'ACTIVO' ";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    public function getAcciones(){
        $db = $this->conecta();
        $query = "select idAccion,nombre from sia_CatAcciones where estatus = 'ACTIVO' ";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }
    public function getSubTiposDocumentosAuditoria(){
        $db = $this->conecta();
        $query = "select idSubTipoDocumento,idTipoDocto,nombre,estatus from sia_catSubTiposDocumentos where estatus='ACTIVO' and auditoria = 'SI'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    public function getSubTiposDocumentosDiversos(){
        $db = $this->conecta();
        $query = "select idSubTipoDocumento,idTipoDocto,nombre,estatus from sia_catSubTiposDocumentos where estatus='ACTIVO' and auditoria = 'NO'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

}


?>