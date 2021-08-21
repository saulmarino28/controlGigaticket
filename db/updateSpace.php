<?php 

    $id= $_POST['id'];
    $name = $_POST['name'];
    $fecha_reg = $_POST['fecha_reg'];
    $spaces = $_POST['spaces'];
   
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
        $querys = " UPDATE  espacios SET nombre_habitacion ='$name', id_espacios = '$name', fecha_registro ='$fecha_reg', lugares = '$spaces'  WHERE id_espacios = '$id' ";
           

        $consulta = $conexion->query($querys);

        if($consulta == FALSE)
            {
             /*echo " error consulta <br>";
             printf("Errormessage: %s\n", $conexion->error,"<br>");
             printf("Errormessage: %s\n", $conexion->errno,"<br>");
             printf("Affected rows (SELECT): %d\n", $conexion->affected_rows);*/
             $error_msg = $conexion->error;
             $datos[] = [
                        'resp' => FALSE,
                        'error_msg' => $error_msg                        
                        ];
            echo json_encode($datos);
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