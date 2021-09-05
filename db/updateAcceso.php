<?php 

    $id= $_POST['id'];
    $name = $_POST['name'];
    $space = $_POST['space'];
    $fecha_i = $_POST['fecha_i'];
    $fecha_f = $_POST['fecha_f'];
    $hour_i = $_POST['hour_i'];
    $hour_f = $_POST['hour_f'];
    
   $conexion = @new mysqli('localhost', 'root', '', 'wifi access');

    
    if($conexion->connect_errno){

        echo "No se pudo conectar (" . $conexion->connect_errno.  "): ". $conexion->connect_error;
    }
    else {
        // echo("Conjunto de caracteres inicial: ".$conexion->character_set_name()."<br>");
         if (!$conexion->set_charset("utf8")) {
           $error_msg = $conexion->error;
                $respuesta[] = ['resp' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB

                echo json_encode($respuesta);     
                exit();         }
         // else {
         // echo("Conjunto de caracteres actual: ". $conexion->character_set_name()."<br>");
          // }


          // echo "conexion exito <br>";
        $querys = " UPDATE  horarios SET usuario= '$name', espacio ='$space', fecha_final='$fecha_f', fecha_inicio ='$fecha_i', hora_inicio ='$hour_i', hora_final = '$hour_f'  WHERE id_horario= '$id'  ";
           

        $consulta = $conexion->query($querys);

        if($consulta == FALSE)
            {
             /*echo " error consulta <br>";
             printf("Errormessage: %s\n", $conexion->error,"<br>");
             printf("Errormessage: %s\n", $conexion->errno,"<br>");
             printf("Affected rows (SELECT): %d\n", $conexion->affected_rows);*/
             $error_msg = $conexion->error;
             $afRows_msg = $conexion->affected_rows;
                $respuesta[] = ['resp' => FALSE, 'error_msg' => $error_msg, 'afRows_msg' => $afRows_msg ]; //hubo error en la consulta e insercion de datos a la DB

                echo json_encode($respuesta);     
                exit();
             
            }
            
        else {

              
            $datos[]= ['resp'=> TRUE];

        }
  
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

  