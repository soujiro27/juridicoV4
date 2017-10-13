<?php 

require_once 'juridico/db/rutasAbsolutas.php';
require_once $rutas['inicio'].'db/utils/utils.php';

public $ruta = $rutas['conexion'];

$app->get('/'.$rutas['inicio'].':modulo',function($modulo) use ($app){
    $app->render('juridico/main.html');
    $utils = new Utils();
    $utils->validateModulUser($modulo,$app,$rutas['conexion']);

});




?>