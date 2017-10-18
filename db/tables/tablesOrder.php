<?php 

class TablesOrder{

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

    public function Volantes($data){
        $db = $this->conecta();
        $query = "select v.idVolante, v.folio, v.subfolio, v.numDocumento as Numero_Documento, v.idRemitente as Remitente, v.idTurnado as Turnado, v.fRecepcion as Recepcion,  v.extemporaneo, 
        a.clave,
        sub.nombre as Documento,
        t.estadoProceso as Estado,
        v.estatus
        from sia_VolantesDocumentos vd
        inner join sia_Volantes v on vd.idVolante=v.idVolante
        inner join sia_turnosJuridico t on v.idVolante=t.idVolante
        inner join sia_auditorias a on vd.cveAuditoria=a.idAuditoria
        inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento order by ".$data['campo']." ".$data['tipo'];
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);
    }
}


?>