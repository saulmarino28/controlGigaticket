
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
    h2{
      color:#CCCCCC;
      text-shadow: #008080 1px 3px 1px;
      text-align: left;
    }
    h5{
      color:#CCCCCC;
      text-shadow: #008080 1px 3px 1px;
      text-align: left;
    }
    .door, .card , .modal-content {
    border: 8px solid #008080;
     box-shadow: #CCCCCC 3px 3px 8px;
  }
  body, .card {
   background: -moz-radial-gradient(center,#3E473A 10%, #006999 90% );
   background: -webkit-radial-gradient(center, #3E473A 10%, #006999 90%);
     /*background: -webkit-linear-gradient(top, #FFFFFF, #006699);
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
       <strong> Espacios</strong>

    </a>
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item active">
          <a class="nav-link" href="searchSpace.php"><strong>Search Space</strong> <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../espacios.php"><strong>Atrás</strong></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../index.php"><strong>Ir a inicio</strong></a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <strong> Menu</strong>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="../menu/mi_perfil.php">Mi perfil</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="../sesiones/cerrarSesionUGT.php">Cerrar Sesión</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="../espacios.php">Atrás</a>
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

  <!--Start alert -->
  <div class="container" id="alertSS"></div>
  <!--Finish alert -->

  <!-- Start Container-->
  <div class="container pt-5 ">
  <h2 class="m-2  ">¡Reserva una habitación!</h2> <br>
  <div class="row justify-content-center" >  
    <div class="col">
      <div class="card">   
        <div class="card-header bg-info ">
          <h5 class=" text-center "> Busca la mejor habitación...</h5>
        </div>
   <form method="POST" id="search" action="#" class="needs-validation" novalidate>
      <div class="row justify-content-center m-2">
        <div class="col-lg-3">
          <div class="form-group">
            <label for="spaces">Espacios:</label>
            <select class="form-control " id="spaces" name="spaces">
              
            </select>
            <div class="valid-feedback">Válido.</div>
            <div class="invalid-feedback">Ingresa un espacio válido.</div>
          </div>             
        </div>
        <!--
        <div class="col-lg-3">
          <div class="form-group">
            <label for="state">Estatus:</label>
            <select class="form-control " id="state">
              <option selected>Elige una opcion</option>
              <option value="1">Todas</option>
              <option value="2">Ocupadas</option>
              <option value="3">Vacias</option>
            </select>
          </div>             
        </div>
      -->
        <div class="col-lg-3">
          <div class="form-group">
            <label for="fecha_i">Fecha ingreso:</label>
            <input type="date" class="form-control" id="fecha_i" placeholder="Ingresa fecha" name="fecha_i" required>
            <div class="valid-feedback">Válido.</div>
            <div class="invalid-feedback">Ingresa una fecha correcta.</div>
          </div>             
        </div>
        <div class="col-lg-3">
          <div class="form-group">
            <label for="fecha_f">Fecha egreso:</label>
            <input type="date" class="form-control" id="fecha_f" placeholder="Ingresa fecha" name="fecha_f" required>
            <div class="valid-feedback">Válido.</div>
            <div class="invalid-feedback">Ingresa una fecha correcta.</div>
            <div id="wrongFecha" name="wrongFecha" class="text-danger invisible ">pero por favor ingresa una fecha final mayor que fecha inicial</div>
          </div>             
        </div>
        <div class="col-lg-3">
           <div class="form-group">
                     <label for="hour_i">
                        Hora ingreso:
                     </label>
                     <input type="time" class="form-control" id="hour_i" placeholder="Ingresa hora" name="hour_i" required>
                     <div class="valid-feedback">Válido.</div>
                     <div class="invalid-feedback">Ingresa una hora correcta.</div>

                  </div>
        </div>
        <div class="col-lg-3">
           <div class="form-group">
                     <label for="hour_f">Hora egreso:</label>
                     <input type="time" class="form-control" id="hour_f" placeholder="Ingresa hora" name="hour_f" required>
                     <div class="valid-feedback">Válido.</div>
                     <div class="invalid-feedback">Ingresa una hora correcta.</div>
                     <div id="wrongHora" name="wrongHora" class="text-danger invisible ">pero por favor ingresa una hora de egreso mayor que la hora de ingreso</div>
                  </div>
        </div>
        <div class="col-lg-3 text-center">
          <div class="form-group">
            <br>
            <button type="submit" class="btn btn-outline-warning btn-lg   d-inline-block " name="enviar" id="enviar">
              Buscar 
            </button>
          </div>             
        </div>
       </div> 
   </form>
   </div>
   </div>
   </div>    
</div>

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
        else {
          var fecha_i = $('#fecha_i').val();
          var fecha_f = $('#fecha_f').val();
          var hora_i = $('#hour_i').val();
          var hora_f = $('#hour_f').val();
          var nombre_espacio =  $('#spaces option:selected').val();

          if (fecha_i > fecha_f ) {

           console.log("error wrong info");
           $('#wrongFecha').removeClass("invisible").addClass("visible");
           $('#wrongHora').removeClass("visible").addClass("invisible");
           event.preventDefault();
           event.stopPropagation();
              
        } 
        else if ((hora_i > hora_f)) {

           console.log("error wrong info");
           $('#wrongFecha').removeClass("visible").addClass("invisible");
           $('#wrongHora').removeClass("invisible").addClass("visible");
           event.preventDefault();
           event.stopPropagation();
           //console.log(hora_i);  
        
        } 
        else {
          console.log("ok processing info");
          $('#alertSS').empty();
          $('#wrongFecha').removeClass("visible").addClass("invisible");
          $('#wrongHora').removeClass("visible").addClass("invisible");
          event.preventDefault();
          var datos= {
                'fecha_i': fecha_i,
                'fecha_f': fecha_f,
                'hora_i': hora_i,
                'hora_f': hora_f,
                'nombre_espacio': nombre_espacio
                };
          $.post('../db/searchSpaceDB.php', datos, function(respuesta){
            respuesta= JSON.parse(respuesta);
            console.log(respuesta);
          });   
        }
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
<script type="text/javascript" src="../js/searchSpace.js"></script>

</body>
</html>