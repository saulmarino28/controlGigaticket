
<?php 
error_reporting(0);
session_start();
 $varsesion = $_SESSION['usuario'];
 if ($varsesion == null || $varsesion = ''){
  echo "No tienes autorizacion, si eres usuario inicia sesion.";
  die();

 }
 ?>

<!DOCTYPE html>
<html>
  <head>
    <!-- <link rel="stylesheet" type="text/css" href="fonts/style.css"> -->	
    <link rel="shortcut icon" type="image/x-icon" href="http://localhost/esp32/paginasBootstrap/gt_icon.ico">
    <!-- caracteres-->
    <meta charset="utf-8">
   <title>User Gigaticket</title>
     <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
       
  </head>
 <style type="text/css">
  *{
  padding: 0px;
  margin: 0px;
    }
    .door, .card , .modal-content {
    border: 8px solid #008080;
     box-shadow: #CCCCCC 3px 3px 8px;
  }
  body, .card {
    background: -moz-radial-gradient(center,#3E473A 10%, #006999 90% );
    background: -webkit-radial-gradient(center, #3E473A 10%, #006999 90%);
     /*background: -moz-linear-gradient(top, #111f11 30%, #006699 90%);
     /*background: linear-gradient(30deg, #111f11 , #006699 );
     */
    color: #ffffff; 
     font-family: cursive;
  }
   
</style>
<body >
    <!-- Start Menu Gigaticket-->
  	<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <!-- Navbar content -->
     <a class="navbar-brand" href="#">
      <img src="http://localhost/esp32/paginasBootstrap/gt_icon.ico" width="30" height="30" class="d-inline-block align-top rounded img-fluid" alt="Gigaticket">
       <strong> Usuarios</strong>

    </a>
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
    	
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item active">
          <a class="nav-link" href="addClient.php"><strong>Agregar Usuario</strong> <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../clientes.php"><strong>Atrás</strong></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../index.php"><strong>Ir a inicio</strong></a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <strong> Menu</strong>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Mi perfil</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Cerrar Sesión</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Atrás</a>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
       <a class="navbar-brand" href="#">
      <img src="http://localhost/Prototipo/aragon.jpg" width="40" height="40" class="d-inline-block align-top rounded img-fluid mx-2" alt="fes aragon">
    </a>
  </div>
  </nav>
  <!-- Finish Menu Gigaticket-->
  	<!-- Start alert status-->
  	<div class="container" id="alertAC">
     
  	</div>
    <!-- Start alert status-->

  <!-- Start Container Form Add Client-->
  <div class="container pt-5 ">
  <div class="row justify-content-center" >
    <div class="col-md-9">
      <div class="card">
         
    <div class="card-header bg-info ">
      <h3 class=" text-center"> Agregar Usuario</h3>
    </div>
   <form method="POST" action="#" class="needs-validation my-2" id="addClient" novalidate>
      <div class="row justify-content-center ">
         <div class="col-sm-5">
          <div class="form-group">
                     <label for="name">Nombre:</label>
                     <input type="text" class="form-control" id="name" placeholder="Ingresa Nombre" name="name" required>
                     <div class="valid-feedback">Válido.</div>
                     <div class="invalid-feedback">EL nombre de usuario debe tener de 3-10 dígitos.</div>
                  </div>                
                  <div class="form-group">
                     <label for="email">Email:</label>
                     <input type="email" class="form-control" id="email" placeholder="Ingresa Email" name="email" required>
                     <div class="valid-feedback">Válido.</div>
                     <div class="invalid-feedback">Por favor escribe un correo válido.</div>
                  </div>      
          </div>
          <div class="col-sm-5">
           <div class="form-group">
                      <label for="lastName">Apellido:</label>
                      <input type="text" class="form-control" id="lastName" placeholder="Ingresa Apellido" name="lastName" required>
                      <div class="valid-feedback">Válido.</div>
                      <div class="invalid-feedback">El Apellido debe tener de 3-15 dígitos y solo contener letras.</div>
                   </div>
                   <div class="form-group">
                   <label for="phone">Teléfono:</label>
                   <input type="tel" class="form-control" id="phone" placeholder="Ingresa Teléfono" name="phone" required>
                     <div class="valid-feedback">Válido.</div>
                   <div class="invalid-feedback">El Teléfono debe tener de 10 dígitos y solo contener números.</div>
                </div>        
          </div>

          <div class="col-sm-5">
          <div class="form-group">
                     <label for="hab">Número de habitación:</label>
                     <input type="number" class="form-control" id="hab" placeholder="" name="hab" required>
                     <div class="valid-feedback">Válido.</div>
                     <div class="invalid-feedback">El número de habitación debe tener de 3-10 dígitos.</div>
                  </div> 
                  <div class="form-group">
                     <label for="date">Fecha de ingreso:</label>
                     <input type="date" class="form-control" id="date" placeholder="Ingresa fecha" name="date" required>
                     <div class="valid-feedback">Válido.</div>
                     <div class="invalid-feedback">Ingresa una fecha correcta.</div>
                  </div>
                  <div class="form-group">
                     <label for="hour">Hora:</label>
                     <input type="time" class="form-control" id="hour" placeholder="Ingresa hora" name="hour" required>
                     <div class="valid-feedback">Válido.</div>
                     <div class="invalid-feedback">Ingresa una hora correcta.</div>
                  </div>                
                  
                </div>
          <div class="col-sm-5">

          	<div class="form-group">
                <label for="rfid">Número de tarjeta:</label>
                <input type="text" class="form-control" id="rfid" placeholder="Ingresa tarjeta RFID" name="rfid" required>
                <div class="valid-feedback">Válido.</div>
                <div class="invalid-feedback">Por favor ingresa la terjeta RFID.</div>
            </div>

            <div class="form-group">
                     <label for="estadia">Fecha de egreso:</label>
                     <input type="date" class="form-control" id="estadia" placeholder="4 dias, 1 mes" name="estadia" min="<?php echo date("Y-m-d");?>" max="2100-12-31" value="<?php echo date("Y-m-d");?>" required>
                     <div class="valid-feedback">Válido.</div>
                     <div class="invalid-feedback">Por favor escribe una fecha de egreso correcta.</div>
                  </div>     
                                         
          </div>
       </div>
       <div class="row justify-content-center my-4  ">
          <div class="col-sm-5 text-center">               
                   <div class="form-group  ">
                      <button type="submit" class="btn btn-outline-info btn-lg btn-block  " id="addClient" name="enviar">
                        Agregar Usuario
                      </button>
                   </div> 
               </div>
       </div> 
    </form> 
   </div>
   </div>
   </div>   
</div>
<br>
<script>
// Disable form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
</script>
  <!-- Finish Container-->  

<!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript" src="../js/addClient.js"></script>
</body>
</html>