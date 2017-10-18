<?php 

require_once 'juridico/db/rutasAbsolutas.php';
$rutas = new RutasAbsolutas();
$rutas = $rutas->rutas();


require_once $rutas['utils'].'utils.php';
require_once $rutas['tables'].'tables.php';
require_once $rutas['tables'].'tablesOrder.php';
require_once $rutas['catalogos'].'catalogos.php';

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



/*------------------------------------------------------*/



/*----------------- Tablas Ordenadas -------------------*/
$app->get('/table/Order/Volantes',function() use ($app){
    $tables = new TablesOrder();
    $tables->Volantes($app->request->get());
});
/*-------------------------------------------------------*/






/*---------------- Rutas para obtener datos de los Catalogos-------------*/
$app->get('/datos/catalogos/tiposDocumentos',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getTiposDocumentos();
});

$app->get('/datos/catalogos/subTiposDocumentos',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getSubTiposDocumentos();
});

$app->get('/datos/catalogos/caracteres',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getCaracteres();
});

$app->get('/datos/catalogos/turnados',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getTurnados();
});

$app->get('/datos/catalogos/acciones',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getAcciones();
});

$app->get('/datos/catalogos/SubTiposDocumentosAuditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getSubTiposDocumentosAuditoria();
});

$app->get('/datos/catalogos/SubTiposDocumentosDiversos',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getSubTiposDocumentosDiversos();
});
/*-------------------------------------------------------*/

/*---------------- OBtiene los datos de la auditoria -----*/

$app->get('/datos/auditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getAuditorias($app->request->get());
})

/*--------------------------------------------------------*/



?>