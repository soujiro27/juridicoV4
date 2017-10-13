<?php 

class Utils{

    private $roles = array(
        'Caracteres' => 'JURIDICO',
        'DoctosTextos' => 'JURIDICO',
        'SubTiposDocumentos' => 'JURIDICO',
        'Acciones' => 'JURIDICO',
        'DocumentosGral' => 'JURIDICO',
        'Volantes' =>'JURIDICO'
    );

    public function conecta($rutaConexion){
        try{
            require $this->rutaConexion;
            $db = new PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
            return $db;
        }catch (PDOException $e) {die();}
    }


    public function validateModulUser($modulo,$app,$rutaConexion){
        $db = $this->conecta($rutaConexion);
        $query = "select idRol from sia_usuariosroles where idUsuario='".$_SESSION['idUsuario']."'";
        $sql = $db->prepare($query);
        $sql->execute();
        $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        
        $roles = $this->roles;
        if(!array_key_exists($modulo,$roles)){
           $app->redirect('/dashboard');
        }else{
            if($roles[$modulo]!=$res[0]['idRol']) {
                $app->redirect('/dashboard');
            }
        }
    }
    
}

/*

{"logueado":1
    "idUsuario":"2293"
    "idCuentaActual":"CTA-2016"
    "sCuentaActual":"CUENTA PUBLICA 2016"
    "aniocuenta":"2016"
    "slim.flash":[]
    "usrGlobal":"NO"
    "usrGlobalArea":"NO"
    "sUsuario":" CARLOS GABRIEL CRUZ SANDOVAL"
    "idEmpleado":"2000"
    "idArea":"DGAJ"
    "sPlaza":"SRIO. PARTICULAR DE DIRECTOR GRAL. DE LA DIRECCI\u00d3N GENERAL DE ASUNTOS JUR\u00cdDICOS"
    "idEntidad":"9"
    "idCuentaVariable":"CTA-2016"
    "idProgramaActual":"PGA-CTA-2016"}

    */
?>