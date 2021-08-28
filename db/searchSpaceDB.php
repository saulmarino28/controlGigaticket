<?php	

if($_POST) {
   // error_reporting(0);
    $fecha_i = $_POST['fecha_i']; 
    $fecha_f= $_POST['fecha_f']; 
    $hora_i = $_POST['hora_i'];
    $hora_f= $_POST['hora_f']; 
    $nombre_espacio= $_POST['nombre_espacio']; 


    $conexion = @new mysqli('localhost', 'root', '', 'wifi access');
    if($conexion->connect_errno){
        echo "No se pudo conectar (" . $conexion->connect_errno.  "): ". $conexion->connect_error;
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
        $querys= "SELECT * FROM horarios WHERE  (espacio = '$nombre_espacio') AND ((('$fecha_i' BETWEEN fecha_inicio AND fecha_final) OR ('$fecha_f'  BETWEEN fecha_inicio AND fecha_final )) OR (( fecha_inicio BETWEEN '$fecha_i' AND '$fecha_f') OR (fecha_final  BETWEEN '$fecha_i' AND '$fecha_f' ))) AND ((('$hora_i' BETWEEN hora_inicio AND hora_final) OR ('$hora_f'  BETWEEN hora_inicio AND hora_final )) OR (( hora_inicio BETWEEN '$hora_i' AND '$hora_f') OR (hora_final  BETWEEN '$hora_i' AND '$hora_f' ))) ";
        //echo ($querys);
        $consulta = $conexion->query($querys);

        if($consulta == FALSE) {
            echo " error consulta <br>";
            printf("Errormessage: %s\n", $conexion->error,"<br>");
            printf("Errormessage: %s\n", $conexion->errno,"<br>");
            printf("Affected rows (SELECT): %d\n", $conexion->affected_rows);
             
        }
        if ($consulta->num_rows === 0) {
            // ¡Oh, no hay filas! Unas veces es lo previsto, pero otras
            // no. Nosotros decidimos. En este caso, ¿podría haber sido
            // actor_id demasiado grande? 
            //echo "Lo sentimos. No se pudo encontrar datos de los clientes, Inténtelo de nuevo.<br>";
            //printf("Lineas afectadas (SELECT): %d\n", $conexion->affected_rows);
            $consulta->free();
            $conexion->close();
            $datos[] = [
                
                'resp' => FALSE

            ];
            echo json_encode($datos);
            exit;
              
        }
        else {
            
            // echo "exito consulta <br>";
            $datos =[];
            foreach ($consulta as $dato) {

                $datos[] = [
                    
                    'id_horario' => $dato['id_horario'],
                    'usuario' => $dato['usuario'],
                    'fecha_inicio' => $dato['fecha_inicio'],
                    'fecha_final' => $dato['fecha_final'],
                    'hora_inicio' => $dato['hora_inicio'],
                    'hora_final' => $dato['hora_final'],
                    'espacio' => $dato['espacio']
                ];
            
            }
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
                
?>
