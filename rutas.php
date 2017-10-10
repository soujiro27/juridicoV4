<?php 


$app->get('/juridico/:modulo',function($modulo) use ($app){
    $app->render('jur/View/templates/main.html');
});




?>