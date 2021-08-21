
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
       <strong> Espacios</strong>

    </a>
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item active">
          <a class="nav-link" href="editSpace.php"><strong>Editar Espacio</strong> <span class="sr-only">(current)</span></a>
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
      
       <a class="navbar-brand" href="#">
      <img src="http://localhost/Prototipo/aragon.jpg" width="40" height="40" class="d-inline-block align-top rounded img-fluid mx-2" alt="fes aragon">
    </a>
  </div>
  </nav>
  <!-- Finish Menu Gigaticket-->
    <!-- Start alert status-->
    <div class="container" id="alertES">
     
    </div>
    <!-- Finish alert status-->

  <!-- Start Container edit Client-->
  
    <!--Modal  start -->
    <div class="container text-dark m-2">
      <!-- Modal -->
      <div class="modal fade  " id="editModalS" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog  ">
          <div class="modal-content bg-info border-dark">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Editar Espacio</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body"> 
              <form method="POST" action="#" class="needs-validation my-2" novalidate>
                <div class="row justify-content-center ">
                  <div class="col-sm-5">
                    <input type="hidden" name="id_updateS" id="id_updateS" class="">
                    <div class="form-group">
                      <label for="name">Nombre:</label>
                      <input type="text" class="form-control" id="name" placeholder="Ingresa Nombre" name="name" required>
                      <div class="valid-feedback">Válido.</div>
                      <div class="invalid-feedback">EL nombre de usuario debe tener de 3-10 dígitos.</div>
                    </div>                  
                  </div>

                  <div class="col-sm-5">
                    <!--
                    <div class="form-group">
                      <label for="phone">Piso:</label>
                      <input type="text" class="form-control" id="pisos" placeholder="Ingresa num de pisos" name="pisos" required>
                      <div class="valid-feedback">Valido.</div>
                      <div class="invalid-feedback">El piso debe tener solo contener numeros.</div>
                    </div> --> 
                    <div class="form-group">
                      <label for="fecha_reg">Fecha de registro:</label>
                      <input type="date" class="form-control" id="fecha_reg" placeholder="Ingresa fecha" name="fecha_reg" required>
                      <div class="valid-feedback">Valido.</div>
                      <div class="invalid-feedback">Ingresa una fecha correcta.</div>
                    </div>         
                  </div>
                  <div class="col-sm-5">
                    <div class="form-group">
                      <label for="spaces">Lugares:</label>
                      <input type="number" class="form-control" id="spaces" placeholder="Ingresa fecha" name="spaces" required>
                      <div class="valid-feedback">Valido.</div>
                      <div class="invalid-feedback">Ingresa una numero correcto.</div>
                    </div>                    
                  </div>
           </div>      
       </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-outline-light  " name="actualizarS" id="actualizarS">  
              Actualizar Espacio
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- Modal finish -->

<!--table start  -->
<div class="container ">
      
      <div class="container-fluid  mt-5 table-responsive-xl">
         <div class="row text-center">
            <div class="col-sm-6 text-center">
               <input class="form-control " id="myInput" type="text" placeholder="Search.."><br>     
            </div>
         </div>
         <div class="row d-flex  ">
            <div class="col-xl-12 text-center">
                <table class="table table-primary table-hover table-bordered">
                          <thead class="thead-dark text-center">
                              <tr class="">
                                  <th>ID</th>
                                  <th>Nombre habitación</th>
                                  <th>Fecha registro</th>
                                  <th>Lugares</th>
                                  <th>Editar</th>
                              </tr>
                          </thead>
                     <tbody class="text-center" id="tablaS">                         

                      </tbody>
                      
                </table>
            </div>
        </div>
       </div>
       <div id="res" class="text-center">
         
       </div>
       <br>
      <!--boton actualizar start -->
      <div class="row justify-content-center m-2">
        <div class="col-sm-3 text-center">
                            
          <div class="form-group">
            <button  class="btn btn-outline-info btn-lg btn-block m-3  " name="btn-actualizarS" id="btn-actualizarS">Actualizar tabla</button>
          </div> 
        </div>
      </div> 
      <!--boton actualizar finish -->
</div>
<!-- Table finish -->
<!--Finish container -->
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
<!--<script type="text/javascript" src="../js/selectTipHab.js"></script>-->
<script type="text/javascript" src="../js/editSpace.js"></script>
</body>
</html>