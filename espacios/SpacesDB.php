<?php	

//if($_GET) {
   // error_reporting(0);
  

  $conexion = @new mysqli('localhost', 'root', '', 'wifi access');
    if($conexion->connect_errno){
        echo "No se pudo conectar (" . $conexion->connect_errno.  "): ". $conexion->connect_error;
    }
    else {
        // echo("Conjunto de caracteres inicial: ".$conexion->character_set_name()."<br>");
         if (!$conexion->set_charset("utf8")) {
           echo("Error cargando el conjunto de caracteres utf8: ". $conexion->error);
             exit();
         }
         // else {
         // echo("Conjunto de caracteres actual: ". $conexion->character_set_name()."<br>");
          // }
          // echo "conexion exito <br>";
        
        $querys = "SELECT * FROM espacios";
         // echo ($querys);
          $consulta = $conexion->query($querys);

         
         if($consulta == FALSE)
            {
             echo " error consulta <br>";
             printf("Errormessage: %s\n", $conexion->error,"<br>");
             printf("Errormessage: %s\n", $conexion->errno,"<br>");
             printf("Affected rows (SELECT): %d\n", $conexion->affected_rows);
             
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
              if ($consulta->num_rows === 0) {
              // ¡Oh, no hay filas! Unas veces es lo previsto, pero otras
              // no. Nosotros decidimos. En este caso, ¿podría haber sido
              // actor_id demasiado grande? 
                //echo "Lo sentimos. No se pudo encontrar datos de los clientes, Inténtelo de nuevo.<br>";
                //printf("Lineas afectadas (SELECT): %d\n", $conexion->affected_rows);
                $consulta->free();
                $conexion->close();
                $datos[] = [
                
                'resp' => TRUE

                ];
                echo json_encode($datos);

              exit;
              
              }
            else { 
               $datos =[];

                foreach ($consulta as $dato) {

                    $datos[] = [
                        
                        'id_espacios' => $dato['id_espacios'],
                        'nombre_habitacion' => $dato['nombre_habitacion'],
                        'fecha_registro' => $dato['fecha_registro'],
                        'lugares' => $dato['lugares']

                             ];
                    
                }

                 $consulta->free();
                $conexion->close();
                echo json_encode($datos);
                 switch(json_last_error()) {
                    case JSON_ERROR_NONE:
                       // echo ' - Sin errores';
                    break;
                    case JSON_ERROR_DEPTH:
                        echo ' - Excedido tamaño máximo de la pila';
                    break;
                    case JSON_ERROR_STATE_MISMATCH:
                        echo ' - Desbordamiento de buffer o los modos no coinciden';
                    break;
                    case JSON_ERROR_CTRL_CHAR:
                        echo ' - Encontrado carácter de control no esperado';
                    break;
                    case JSON_ERROR_SYNTAX:
                        echo ' - Error de sintaxis, JSON mal formado';
                    break;
                    case JSON_ERROR_UTF8:
                        echo ' - Caracteres UTF-8 malformados, posiblemente codificados de forma incorrecta';
                    break;
                    default:
                        echo ' - Error desconocido';
                    break;
                }
            
              }
            }

          //}                 
?>
