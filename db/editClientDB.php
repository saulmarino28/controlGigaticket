<?php 
    $id_usuario = $_POST['id_user'];
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
        $querys = " SELECT  * FROM clientes WHERE IdCliente = '$id_usuario' ";
           

        $consulta = $conexion->query($querys);

        if($consulta == FALSE)
            {
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
                
                'resp' => TRUE

                ];
                echo json_encode($datos);

              exit;
              
              }
        else {
            
             // echo "exito consulta <br>";
             
             //}

              //$consultas = $conexion->query($querys);
   $datos =[];

        foreach ($consulta as $dato) {

            $datos[] = [
                
                'IdC' => $dato['IdCliente'],
                'name' => $dato['Nombre'],
                'lastName' => $dato['Apellido'],
                'email' => $dato['Correo'],
                'phone' => $dato['Telefono'],
                'rfid' => $dato['Rfid'],
                'hab' => $dato['Habitacion'],
                'fecha_i' => $dato['Fecha_ingreso'],
                'fecha_f' => $dato['Fecha_egreso'],
                'hour_i' => $dato['Hora_ingreso'],
                'hour_f' => $dato['Hora_egreso']

                     ];
            
        }

        }
    $consulta->free();
    }


    $conexion->close();
    
    //$datos = utf8_encode($datos);
    

    //header('Content-Type: application/json');
    //echo json_encode($datos, JSON_FORCE_OBJECT);
    echo json_encode($datos);
     // json_encode($datos);
     //var_dump($datos);

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
    
 
   ?>

  