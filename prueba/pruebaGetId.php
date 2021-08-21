
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>prueba</title>
</head>
<body>

	<h1>hola</h1>
	<form method="get" action="
#" name="form" id="form">
	<label>Nombre</label>
	<input type="text" pattern="[a-zA-Z]{3,20}" name="nombre" id="nombre" placeholder="saul" maxlength="20" required>
	<label>Apellido</label>
	<input type="text" pattern="[a-zA-Z]{3,20}" name="apellido" id="apellido" placeholder="colima" maxlength="20" required>
	<label>Correo</label>
	<input type="email"  name="correo" id="correo" placeholder="ejemplo@dominio.com"  required>
	<label>Contraseña</label>
	<input type="password"  name="password" id="password" placeholder="4-12 digitos"  required>
	<label>Repite la Contraseña</label>
	<input type="password"  name="password2" id="password2" placeholder="4-12 digitos"  required>
	<label>Telefono</label>
	<input type="text"  name="telefono" id="telefono" placeholder="5580558055"  required>
	<label>ID</label>
	<input type="text"  name="rfid" id="rfid" placeholder="ingrese tarjeta rfid" maxlength="10" required> 
	<!--<span style="font-size: 20px" id="rfid">000000000</span>-->
	

   <button type="submit">Enviar</button>

</form> 
 <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
     
    <!--
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script> 
    -->
     <script src="https://code.jquery.com/jquery-3.5.0.js" integrity="sha256-r/AaFHrszJtwpe+tHyNi/XCfMxYpbsRg2Uqn0x3s2zc="crossorigin="anonymous"></script>
    <script type="text/javascript" src="prueba_GetId.js"></script>
</body>
</html>


<?php 
/*
	header('Access-Control-Allow-Origin: http://www.example.com');
//if you need cookies or login etc
header('Access-Control-Allow-Credentials: true');
if ($this->getRequestMethod() == 'OPTIONS')
{
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Max-Age: 604800');
  //if you need special headers
  header('Access-Control-Allow-Headers: x-requested-with');
  exit(0);
}
*/
 ?>

<!--
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Do get request</title>
</head>
<body>
    <div>Normal response</div>
    <div id="content"></div>
    <div>Error response</div>
    <div id="errorContent"></div>
</body>
!--
<script>
    var xhttp = new XMLHttpRequest();
 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            // Typical action to be performed when the document is ready:
            document.getElementById("content").innerHTML = xhttp.responseText;
        }
    };
    xhttp.onerror = function () {
        document.getElementById("errorContent").innerHTML = "Status code is " + this.status + " click F12 and check what is the problem on console";
    };
 
    var params = {
        ip: "192.168.1.123",
        gw: "192.168.1.1",
        nm: "192.168.1.255"
    }
 
    xhttp.open("POST", "http://192.168.1.81/settings", true);
 
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
 
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(params)) // Make sure to stringify
 
</script>
-->
<!--
<script>

	var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById("content").innerHTML = xhttp.responseText;
        }
    };
    xhttp.onerror = function () {
        document.getElementById("errorContent").innerHTML = "Status code is " + this.status + " click F12 and check what is the problem on console"+"saulmalo";
    };

    xhttp.open("GET", "http://esp32_saulma/settings");
    xhttp.withCredentials = true;
    
    
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");

	xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

 
</script> --
</html>-->

