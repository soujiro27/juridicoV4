<?php 
  


 class RutasAbsolutas{
    private $rutas  = array(
        'inicio' =>'juridico/',
        'conexion' => 'src/conexion.php',
        'utils' => 'juridico/db/utils/',
        'tables' => 'juridico/db/tables/',
        'catalogos' => 'juridico/db/catalogs/',
        'insert' => 'juridico/db/insert/',
        'update' => 'juridico/db/update/'
    );


     public function rutas(){
         $links = $this->rutas;
         return $links;
     }
 }

?>