<?php 

require_once 'juridico/db/rutasAbsolutas.php';
$rutas = new RutasAbsolutas();
$rutas = $rutas->rutas();


require_once $rutas['utils'].'utils.php';
require_once $rutas['tables'].'tables.php';

/*-----------Render Principal ------------------*/
$app->get('/'.$rutas['inicio'].':modulo',function($modulo) use ($app){
    $utils = new Utils();
    $utils->validateModulUser($modulo,$app);
    $app->render('juridico/main.html');
    $_SESSION['ruta'] = $modulo;
});
/*---------------------------------------------*/

/*--------------- Datos de Sessiones ----------*/
$app->get('/Sessions',function(){

    
    $datos = array(
        "idUsuario"         => $_SESSION['idUsuario'],
        "idCuentaActual"    => $_SESSION['idCuentaActual'],
        "userName"          => $_SESSION['sUsuario'],
        "cuenta"            => $_SESSION['sCuentaActual'],
        "ruta"              => $_SESSION['ruta']
    );

    echo json_encode($datos);
        
});

/*---------------------------------------------*/






/*----------------- Rutas Tablas ---------------*/

$app->get('/table/Caracteres',function() use ($app){
    $tables = new Tables();
    $tables->Caracteres();
});


$app->get('/table/Acciones',function() use ($app){
    $tables = new Tables();
    $tables->Acciones();
});


$app->get('/table/DoctosTextos',function() use ($app){
    $tables = new Tables();
    $tables->DoctosTextos();
});

$app->get('/table/SubTiposDocumentos',function() use ($app){
    $tables = new Tables();
    $tables->SubTiposDocumentos();
});

$app->get('/table/Volantes',function() use ($app){
    $tables = new Tables();
    $tables->Volantes();
});


$app->get('/table/DocumentosGral',function() use ($app){
    $tables = new Tables();
    $tables->DocumentosGral();
});


?>