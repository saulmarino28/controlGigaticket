<?php 
    if ($_POST) {
        // code...
    $name=$_POST["name"];
    $lastName=$_POST["lastName"];
    $email=$_POST["email"];
    $phone=$_POST["phone"];
    $rfid=$_POST["rfid"];
    $space = $_POST["space"];
    $fecha_i=$_POST["fecha_i"];
    $fecha_f=$_POST["fecha_f"];
    $hora_i = $_POST["hora_i"];
    $hora_f = $_POST["hora_f"];

    $conexion = @new mysqli('localhost', 'root', '', 'wifi access');
    if($conexion->connect_errno){
        //echo "No se pudo conectar (" . $conexion->connect_errno.  "): ". $conexion->connect_error;
      $error_msg = $conexion->error;
      $respuesta[] = ['respuesta' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB
      echo json_encode($respuesta);
      exit();
    }
    else {
        if (!$conexion->set_charset("utf8")) {
          //echo("Error cargando el conjunto de caracteres utf8: ". $conexion->error);
          $error_msg = $conexion->error;
          $respuesta[] = ['respuesta' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB
          echo json_encode($respuesta);
          exit();
        }
         # code...
          $querys = "SELECT * FROM horarios WHERE espacio = '$space' ";
         // echo ($querys);
         
         $consulta = $conexion->query($querys);
          if($consulta == FALSE) {
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
          if ($consulta->num_rows === 0) {
              // ¡Oh, no hay filas! Unas veces es lo previsto, pero otras
              // no. Nosotros decidimos. En este caso, ¿podría haber sido
              // actor_id demasiado grande? 
                //echo "Lo sentimos. No se pudo encontrar datos de los clientes, Inténtelo de nuevo.<br>";
                //printf("Lineas afectadas (SELECT): %d\n", $conexion->affected_rows);
                $consulta->free();
                $conexion->close();
               $error_msg = $conexion->error;
              $respuesta[] = ['respuesta' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB
              echo json_encode($respuesta);
              exit();    
                
          }
          else {
            $datos=[];
            foreach ($consulta as $dato) {
            
              if ($fecha_i >= $dato['fecha_inicio'] && $fecha_f <= $dato['fecha_final']){
                $datos[] = [
                    
                    'res' => TRUE
                         ];
        
                  echo(json_encode($datos));
                  break;
                
              }
              else {
                if ($fecha_i <= $dato['fecha_inicio'] && $fecha_f <= $dato['fecha_final']){
                $datos[] = [
                    
                    'res' => TRUE
                         ];
        
                  echo(json_encode($datos));
                  break;
              }
              else{
                 $datos[] = [
                    'space' => $dato['espacio'],
                    'Fecha_ingreso' => $dato['fecha_inicio'],
                    'Fecha_egreso' => $dato['fecha_final'],
                    'fecha_i' => $fecha_i,
                    'fecha_f' => $fecha_f,
                    'res' => FALSE
                         ];
        
                  echo(json_encode($datos));
                  break;
              }
                
            
            }
                         
            } 
             $consulta->free();
            $conexion->close();
         echo(json_encode($datos));
    }
  
    }
}
?>