<?php 
    
    class Tables{

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

        public function Caracteres(){
            $db = $this->conecta();
            $query = "select idCaracter,siglas,nombre,estatus from sia_CatCaracteres";
            $sql = $db->prepare($query);
            $sql->execute();
            $res = $sql->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($res);
        }

        public function Acciones(){
            $db = $this->conecta();
            $query = "select idAccion,nombre,estatus from sia_CatAcciones";
            $sql = $db->prepare($query);
            $sql->execute();
            $res = $sql->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($res);
        }

        public function DoctosTextos(){
            $db = $this->conecta();
            $query = "select idDocumentoTexto,idTipoDocto,tipo,idSubTipoDocumento,texto,estatus from sia_CatDoctosTextos";
            $sql = $db->prepare($query);
            $sql->execute();
            $res = $sql->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($res);
        }

        public function SubTiposDocumentos(){
            $db = $this->conecta();
            $query = "select idSubTipoDocumento,idTipoDocto,nombre,estatus,auditoria from sia_catSubTiposDocumentos";
            $sql = $db->prepare($query);
            $sql->execute();
            $res = $sql->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($res);
        }

        public function Volantes(){
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
            inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento";
            $sql = $db->prepare($query);
            $sql->execute();
            $res = $sql->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($res);
        }

        public function DocumentosGral(){
            $db = $this->conecta();
            $query = "select v.idVolante,v.numDocumento,a.clave,subd.nombre as Documento, v.idTurnado as Remitente,
            v.anexoDoc,tj.estadoProceso
            from sia_Volantes v
            inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
            inner join sia_auditorias a on vd.cveAuditoria=a.idAuditoria
            inner join sia_catSubTiposDocumentos subd on vd.idSubTipoDocumento=subd.idSubTipoDocumento
            inner join sia_turnosJuridico tj on v.idVolante=tj.idVolante
            and v.anexoDoc is not null";
            $sql = $db->prepare($query);
            $sql->execute();
            $res = $sql->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($res);
        }
    }

?>