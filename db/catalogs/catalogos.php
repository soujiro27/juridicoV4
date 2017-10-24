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
        $gral = array ('idArea' => 'DGAJ', 'nombre' => 'DIRECCIÓN GENERAL DE ASUNTOS JURIDICOS');
        array_push($res,$gral);
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


    public function getAuditorias($datos){
        $cuenta=$_SESSION['idCuentaActual'];
        $clave = $datos['clave'];
        $db = $this->conecta();
        $query = "SELECT a.idAuditoria auditoria,ta.nombre tipo, COALESCE(convert(varchar(20),a.clave),convert(varchar(20),a.idAuditoria)) claveAuditoria,
        dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto, a.idArea, a.rubros
        FROM sia_programas p
        INNER JOIN sia_auditorias a on p.idCuenta=a.idCuenta and p.idPrograma=a.idPrograma
        INNER JOIN sia_areas ar on a.idArea=ar.idArea
        left join sia_VolantesDocumentos vd on a.idAuditoria=vd.cveAuditoria
        LEFT JOIN sia_tiposauditoria ta on a.tipoAuditoria= ta.idTipoAuditoria
        WHERE a.idCuenta='$cuenta' and a.clave='$clave' GROUP BY 
        a.idAuditoria, a.clave,ta.nombre,a.idProceso,a.idEtapa,ar.nombre, a.idArea, a.rubros";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    public function getTurnadoAuditorias($datos){
        $cveAuditoria = $datos['cveAuditoria'];
        $db = $this->conecta();
        $query = "select sub.nombre, v.idTurnado as turnado from sia_VolantesDocumentos vd
        inner join sia_Volantes v on vd.idVolante=v.idVolante
        inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento = sub.idSubTipoDocumento
        where cveAuditoria='$cveAuditoria'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    public function getDocumentosAuditoria($datos){
        $documento = $datos['documento'];
        $db = $this->conecta();
        $query = "select anexoDoc from sia_Volantes where numDocumento='$documento'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    public function getObservacionesIrac($datos){
        $volante = $datos['idVolante'];
        $db = $this->conecta();
        $query = "select idObservacionDoctoJuridico,pagina,parrafo,observacion,estatus from sia_ObservacionesDoctosJuridico where idVolante = '$volante'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }


    public function getObservacionesById($datos){
        $volante = $datos['idObservacionDoctoJuridico'];
        $db = $this->conecta();
        $query = "select idObservacionDoctoJuridico,idVolante,idSubTipoDocumento,cveAuditoria,pagina,parrafo,observacion,estatus from sia_ObservacionesDoctosJuridico where idObservacionDoctoJuridico = '$volante'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    
    public function getIracByID($datos){
        $id = $datos['id'];
        $db = $this->conecta();
        $query="select v.idVolante,v.folio,v.numDocumento, v.fRecepcion, v.idRemitente, v.asunto, v.estatus, t.estadoProceso,
        vd.cveAuditoria, sub.idSubTipoDocumento
        from sia_Volantes v
        inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
        inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento
        inner join sia_turnosJuridico t on v.idVolante=t.idVolante
        where sub.nombre='IRAC' and v.idTurnado=
        (select nombreCorto from sia_areas where idAreaSuperior='DGAJ' and idEmpleadoTitular=
        (select idEmpleado from sia_usuarios where idUsuario='".$_SESSION ['idUsuario']."')) and v.idVolante='$id'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }

    public function getDocumentosSiglas($datos){
        $id = $datos['idVolante'];
        $db = $this->conecta();
        $query="select * from sia_DocumentosSiglas where idVolante='$id'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);

    }

    public function getPersonalFirma($datos){
        $id = $datos['idUsuario'];
        $db = $this->conecta();
        $query="select * from sia_PuestosJuridico where idArea = (select pj.idArea from sia_usuarios u
        inner join sia_PuestosJuridico pj on u.idEmpleado=pj.rpe
        where idUsuario='$id') 
        and titular ='NO'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);

    }

    public function getDatoUpdate($modulo,$datos){
        $campo = $datos['campo'];
        $id = $datos['id'];
        if($modulo != 'Volantes' ){
            $modulo = 'Cat'.$modulo;
        }
        $db = $this->conecta();
        $query="select * from sia_$modulo where $campo = '$id' ";
        //echo $query;
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);

    }

}


?>