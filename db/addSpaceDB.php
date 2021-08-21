<?php	

if($_POST) {
   // error_reporting(0);
  $nombre=$_POST["nombre"];
  $lugares=(int)$_POST["lugares"];
  
  

  
  //$userType = $_POST["UserType"];
  //echo "<h2> Hola  tu usertype es:" .$userType. "</h2";
  /*
  if ($userType == 'Administrador') {
    # code...
    $userType = '0010';
  }
  else {
    $userType = '0001';

  }
*/
  $conexion = @new mysqli('localhost', 'root', '', 'wifi access');
    if($conexion->connect_errno){
        //echo "No se pudo conectar (" . $conexion->connect_errno.  "): ". $conexion->connect_error;
      $error_msg = $conexion->error;
      $respuesta[] = ['respuesta' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB
      echo json_encode($respuesta);
      exit();
    }
    else {
        // echo("Conjunto de caracteres inicial: ".$conexion->character_set_name()."<br>");
        if (!$conexion->set_charset("utf8")) {
          //echo("Error cargando el conjunto de caracteres utf8: ". $conexion->error);
          $error_msg = $conexion->error;
          $respuesta[] = ['respuesta' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB
          echo json_encode($respuesta);
          exit();
        }

        
        $fecha_registro = date('Y-m-d');
           # code...
          $querys = "INSERT INTO espacios (id_espacios, nombre_habitacion, fecha_registro, lugares) values ('$nombre','$nombre', '$fecha_registro', $lugares)";
          //echo ($querys);
         
         //$resultado = $conexion->query($querys);
          if($conexion->query($querys) == FALSE) {
              /*echo " error consulta <br>";
              printf("Errormessage: %s\n", $conexion->error,"<br>");
              printf("Errormessage: %s\n", $conexion->errno,"<br>");
              printf("Affected rows (SELECT): %d\n", $conexion->affected_rows);
              */
              $error_msg = $conexion->error;
              $respuesta[] = ['respuesta' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB
              echo json_encode($respuesta);
              exit();    
          }
        
        
       
         
            /*
            if ($conexion->affected_rows === 0 || $conexion->affected_rows === -1) {
              // ¡Oh, no hay filas afectadas! Unas veces es lo previsto, pero otras
              // no. Nosotros decidimos. En este caso, ¿podría haber sido
              //  demasiado grande? 
              echo "Lo sentimos. No se pudo registrar cliente, verifique los datos e Inténtelo de nuevo.<br>";
              printf("Lineas afectadas (SELECT): %d\n", $conexion->affected_rows);
              exit;
              
              }
            */
            //else { 
             
                $respuesta[] = ['respuesta' => TRUE ];
                   
                $conexion->close();
                echo(json_encode($respuesta));
              //}
            }

          }                 
?>
