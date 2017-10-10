<?php 


$app->get('/juridico/:modulo',function($modulo) use ($app){
    $app->render('juridico/View/templates/main.html');
});




?>