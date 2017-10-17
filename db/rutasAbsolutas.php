<?php 
  


 class RutasAbsolutas{
    private $rutas  = array(
        'inicio' =>'juridico/',
        'conexion' => 'src/conexion.php',
        'utils' => 'juridico/db/utils/',
        'tables' => 'juridico/db/tables/'
    );


     public function rutas(){
         $links = $this->rutas;
         return $links;
     }
 }

?>