<?php 

require_once 'juridico/db/rutasAbsolutas.php';
$rutas = new RutasAbsolutas();
$rutas = $rutas->rutas();


require_once $rutas['utils'].'utils.php';
require_once $rutas['tables'].'tables.php';
require_once $rutas['tables'].'tablesOrder.php';
require_once $rutas['catalogos'].'catalogos.php';
require_once $rutas['insert'].'Insert.php';
require_once $rutas['update'].'Update.php';
require_once $rutas['upload'].'Upload.php';

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


$app->get('/juridico/:Irac/add/idVolante/Get/Sessions',function(){
    
        
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
$app->get('/juridico(/:modulo)/datos/catalogos/tiposDocumentos',function() use ($app){
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

$app->get('/juridico/Ifa/add/idVolante/datos/catalogos/DoctosTextos',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getDoctosTextos();
});




/*-------------------------------------------------------*/

/*---------------- OBtiene los datos de la auditoria -----*/

$app->get('/juridico(/:modulo)/datos/auditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getAuditorias($app->request->get());
});


$app->get('/juridico(/:modulo)/turnado/auditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getTurnadoAuditorias($app->request->get());
});

/*--------------------------------------------------------*/

/*---------------------- Obtiene los Documentos ----------*/

$app->get('/juridico(/:modulo)/documentos/auditoria',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getDocumentosAuditoria($app->request->get());
    
});

/*--------------------------------------------------------*/



/*--------- Obtienes las observaciones de irac e ifa -----*/

$app->get('/juridico/:Irac/add/idVolante/observaciones/irac',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getObservacionesIrac($app->request->get());
});

///juridico/Ifa/add/idVolante/observaciones/irac?idVolante=3193

$app->get('/juridico/observaciones/id',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getObservacionesById($app->request->get());
});


$app->get('/juridico/:Irac/add/idVolante/observaciones/id',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getObservacionesById($app->request->get());
});




$app->get('/juridico/:Irac/add/idVolante/irac/id',function($irac) use ($app){
    
    $catalogos = new Catalogos();
    if($irac == 'Irac'){
        $catalogos->getIracByID($app->request->get());
    }elseif($irac == 'Ifa'){
        $catalogos->getIfaByID($app->request->get());
    }
});

$app->get('/juridico/:Irac/add/idVolante/documentosSiglas/id',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getDocumentosSiglas($app->request->get());
});


$app->get('/juridico/confrontasJuridico/add/idVolante/documentosSiglas/id',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getDocumentosConfronta($app->request->get());
});

$app->get('/juridico/:Irac/add/idVolante/irac/firmas',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getPersonalFirma($app->request->get());
});

/*--------------------------------------------------------*/



/*----------- Insercion ---------------------------------*/

$app->post('/juridico/:modulo/Insert',function($modulo) use ($app){
    $insert = new Insert($modulo,$app->request->post());
   
});

$app->post('/juridico/:Irac/add/idVolante/Insert/:modulo',function($irac,$modulo) use ($app){
    $insert = new Insert($modulo,$app->request->post());
   
});





// /juridico/confrontasJuridico/add/idVolante/Insert/confrontasJuridico



/*-------------------------------------------------------*/



/*---------------- Update -------------------------------*/

$app->post('/juridico/:modulo/update(/:campo)/Update',function($modulo) use ($app){
    if($modulo =='VolantesDiversos'){$modulo = 'Volantes';}
    $insert = new Update($modulo,$app->request->post());
   
});

$app->post('/juridico/:Irac/add/idVolante/Update',function() use ($app){
    $modulo ='ObservacionesDoctosJuridico';
    $insert = new Update($modulo,$app->request->post());
   
});


$app->post('/juridico/Irac/add/idVolante/Update/:modulo',function($modulo) use ($app){
   $insert = new Update($modulo,$app->request->post());
   
});


$app->post('/juridico/confrontasJuridico/add/idVolante/Update/confrontasJuridico',function() use ($app){
    $modulo = 'confrontasJuridico';
    $insert = new Update($modulo,$app->request->post());
    
 });




$app->get('/juridico(/:modulo)/update(/:dato)/datos',function($modulo) use ($app){
    $catalogos = new Catalogos();
    $catalogos->getDatoUpdate($modulo,$app->request->get());
    
});

$app->get('/juridico(/:modulo)/update(/:dato)/datosRuta',function($modulo) use ($app){
    $catalogos = new Catalogos();
    $catalogos->getDatoUpdateRuta($app->request->get());
    
});




/*-------------------------------------------------------*/



/*--------------------- Upload de Archivos -------------*/

$app->post('/juridico/:DocumentosGral/uploadFile',function() use ($app){
    
       $controller = new Upload();
       $numDoc=$app->request->post();
       $numDoc=$numDoc['numDocumento'];
      
       $res=$controller->isFileExistAll('Volantes',$numDoc);
           $file=$_FILES['anexoDoc']['name'];
           $nombre=str_replace('/','-',$numDoc);
           $file=explode('.',$file);
           $nameComplete=$nombre.'.'.$file[1];
           if ($file && move_uploaded_file($_FILES['anexoDoc']['tmp_name'],"./juridico/files/".$nombre.'.'.$file[1])){
               //$controllerUpdate= new UpdateController();
               //$datos=array('anexoDoc'=>$nameComplete,'idVolante'=>$res);
            
               //$controllerUpdate->updateFile('Volantes',$datos);
               $controller->actualizaNombre($nameComplete,$res);
           }
     
   });
/*------------------------------------------------------*/


/*----------------- rutas mal echas -------------------*/

$app->get('/juridico/:Doc/update(/:idDoc)/datos/catalogos/tiposDocumentos',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getTiposDocumentos();
});

$app->get('/juridico/:Volantes/update/idVolante/datos/catalogos/caracteres',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getCaracteres();
});

$app->get('/juridico/:Volantes/update/idVolante/datos/catalogos/turnados',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getTurnados();
});

$app->get('/juridico/:Volantes/update/idVolante/datos/catalogos/acciones',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getAcciones();
});

$app->get('/juridico/confrontasJuridico/add/idVolante/datos/Confronta',function() use ($app){
    $catalogos = new Catalogos();
    $catalogos->getCampoConfronta($app->request->get());
});



/*------------------------------------------------------*/


?>