<?php 

require_once 'juridico/db/rutasAbsolutas.php';
$rutas = new RutasAbsolutas();
$rutas = $rutas->rutas();


require_once $rutas['utils'].'utils.php';
require_once $rutas['tables'].'tables.php';
require_once $rutas['tables'].'tablesOrder.php';
require_once $rutas['catalogos'].'catalogos.php';
require_once $rutas['insert'].'Insert.php';

/*-----------Render Principal ------------------*/
$app->get('/'.$rutas['inicio'].':modulo',function($modulo) use ($app){
    $utils = new Utils();
    $utils->validateModulUser($modulo,$app);
    $app->render('juridico/main.html');
    $_SESSION['ruta'] = $modulo;
});
/*---------------------------------------------*/

/*--------------- Datos de Sessiones ----------*/
$app->get('/juridico(/:modulo)/Get/Sessions',function(){

    
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

$app->get('/juridico/table/:modulo',function($modulo) use ($app){
    $tables = new Tables($modulo);
    
});



$app->get('/juridico/table/VolantesDiversos',function() use ($app){
    $tables = new Tables();
    $tables->VolantesDiversos();
});


$app->get('/juridico/table/Irac',function() use ($app){
    $tables = new Tables();
    $tables->irac();
});

$app->get('/juridico/table/confrontasJuridico',function() use ($app){
    $tables = new Tables();
    $tables->confronta();
});

$app->get('/juridico/table/Ifa',function() use ($app){
    $tables = new Tables();
    $tables->ifa();
});

$app->get('/juridico/table/Documentos',function() use ($app){
    $tables = new Tables();
    $tables->documentos();
});

/*------------------------------------------------------*/



/*----------------- Tablas Ordenadas -------------------*/
$app->get('/juridico/table/Order/Volantes',function() use ($app){
    $tables = new TablesOrder();
    $tables->Volantes($app->request->get());
});
/*-------------------------------------------------------*/






/*---------------- Rutas para obtener datos de los Catalogos-------------*/
$app->get('/juridico/:modulo/datos/catalogos/tiposDocumentos',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getTiposDocumentos();
});

$app->get('/juridico/:modulo/datos/catalogos/subTiposDocumentos',function($modulo) use ($app){
    $catalogos = new Catalogos();
    $catalogos->getSubTiposDocumentos();
});

$app->get('/juridico/:modulo/datos/catalogos/caracteres',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getCaracteres();
});

$app->get('/juridico/:modulo/datos/catalogos/turnados',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getTurnados();
});

$app->get('/juridico/:modulo/datos/catalogos/acciones',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getAcciones();
});

$app->get('/juridico/:modulo/datos/catalogos/SubTiposDocumentosAuditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getSubTiposDocumentosAuditoria();
});

$app->get('/juridico/:modulo/datos/catalogos/SubTiposDocumentosDiversos',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getSubTiposDocumentosDiversos();
});
/*-------------------------------------------------------*/

/*---------------- OBtiene los datos de la auditoria -----*/

$app->get('/juridico/datos/auditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getAuditorias($app->request->get());
});


$app->get('/juridico/turnado/auditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getTurnadoAuditorias($app->request->get());
});

/*--------------------------------------------------------*/

/*---------------------- Obtiene los Documentos ----------*/

$app->get('/juridico/documentos/auditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getDocumentosAuditoria($app->request->get());
    
});

/*--------------------------------------------------------*/



/*--------- Obtienes las observaciones de irac e ifa -----*/

$app->get('/juridico/observaciones/irac',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getObservacionesIrac($app->request->get());
});

$app->get('/juridico/observaciones/id',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getObservacionesById($app->request->get());
});


$app->get('/juridico/irac/id',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getIracByID($app->request->get());
});

$app->get('/juridico/documentosSiglas/id',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getDocumentosSiglas($app->request->get());
});

$app->get('/juridico/irac/firmas',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getPersonalFirma($app->request->get());
});

/*--------------------------------------------------------*/



/*----------- Insercion ---------------------------------*/

$app->post('/juridico/:modulo/Insert',function($modulo) use ($app){
    $insert = new Insert($modulo,$app->request->post());
   
});

/*-------------------------------------------------------*/









?>