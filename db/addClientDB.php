<?php 

	if($_POST) {
	    // error_reporting(0);
	    $name=$_POST["name"];
	    $lastName=$_POST["lastName"];
	    $email=$_POST["email"];
	    $phone=$_POST["phone"];
	    $rfid=$_POST["rfid"];
	    $hab = (int)$_POST["hab"];
	    $fecha_i=$_POST["fecha_i"];
	    $fecha_f=$_POST["fecha_f"];
	    $hour = $_POST["hour"];

	    $conexion = @new mysqli('localhost', 'root', '', 'wifi access');
	    if($conexion->connect_errno){
	        echo "No se pudo conectar (" . $conexion->connect_errno.  "): ". $conexion->connect_error;

	        $respuesta[] = ['respuesta' => FALSE ];

	        exit();
	    }
	    else {
	        // echo("Conjunto de caracteres inicial: ".$conexion->character_set_name()."<br>");
	        if (!$conexion->set_charset("utf8")) {
	          	$error_msg = $conexion->error;
                $respuesta[] = ['respuesta' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB

                echo json_encode($respuesta);     
	        	exit();

	        	exit();
	        }
         
	        $querys = "INSERT INTO clientes (Nombre, Apellido, Correo, Telefono, Rfid, Habitacion, Fecha_ingreso, Fecha_egreso, Hora) values ('$name', '$lastName','$email', '$phone', '$rfid', '$hab', '$fecha_i', '$fecha_f', '$hour')";

	        if($conexion->query($querys) == FALSE) {
	          /* 	echo " error consulta <br>";
	            printf("Errormessage: %s\n", $conexion->error,"<br>");
	            printf("Errormessage: %s\n", $conexion->errno,"<br>");
	            printf("Affected rows (SELECT): %d\n", $conexion->affected_rows);
	           */
	            $error_msg = $conexion->error;
                $respuesta[] = ['respuesta' => FALSE, 'error_msg' => $error_msg ]; //hubo error en la consulta e insercion de datos a la DB

                echo json_encode($respuesta);     
	        	exit(); 
	        }
        
            else { 
              	
               $respuesta[] = ['respuesta' => TRUE ];

                $conexion->close();
            	echo json_encode($respuesta);

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
    } 
 ?>