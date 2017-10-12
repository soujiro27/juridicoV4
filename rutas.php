<?php 


$app->get('/juridico/:modulo',function($modulo) use ($app){
    $app->render('juridico/main.html');
});




?>