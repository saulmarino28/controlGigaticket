
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
    .h3{
      color:#006699;
      text-shadow: #000000 1px 3px 1px;
      text-align: left;
    }
    .door, .card {
      border: 8px solid #008080;
       box-shadow: #CCCCCC 3px 3px 8px;
    }

  </style>
<body class="bg-secondary">
    <!-- Start Menu Gigaticket-->
  	<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <!-- Navbar content -->
     <a class="navbar-brand" href="#">
      <img src="http://localhost/esp32/paginasBootstrap/gt_icon.ico" width="30" height="30" class="d-inline-block align-top rounded img-fluid" alt="Gigaticket">
       <strong>Control de usuarios</strong>

    </a>
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
    	
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item ">
          <a class="nav-link" href="index.php"><strong>Inicio</strong> </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="clientes.php"> <strong>Usuarios</strong></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="accesos.php"><strong>Accesos</strong><span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="espacios.php"><strong>Espacios</strong></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="registros.php"><strong>Registros</strong></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <strong> Menu</strong>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="menu/mi_perfil.php">Mi perfil</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="sesiones/cerrarSesionUGT.php">Cerrar Sesión</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="../gigaticket/index.php">Atrás</a>
          </div>
        </li>
      </ul>
      
       <a class="navbar-brand" href="#">
      <img src="http://localhost/Prototipo/aragon.jpg" width="40" height="40" class="d-inline-block align-top rounded img-fluid mx-2" alt="fes aragon">
    </a>
  </div>
  </nav>
  <!-- Finish Menu Gigaticket-->

  <!-- Start Container-->
  <div id="accesos" class="container "><br>
        <h3 class="h3">Acceso de Usuarios</h3><br>
        <div class="container ">
              <div class=" row justify-content-center m-5">
                <div class="col  mt-3 mx-3 ">
                  <div class="card" style="width:250px">
                     <img class="card-img-top " src="http://localhost/esp32/imagenes/userAdd.png" alt="User Add" style="width:100%">
                     <!--Add .card-img-top or .card-img-bottom to an <img> to place the image at the top or at the bottom inside the card. Note that we have added the image outside of the .card-body to span the entire width -->
                     <div class="card-body"> <!--Use .card-title to add card titles to any heading element. The .card-text class is used to remove bottom margins for a <p> element if it is the last child (or the only one) inside .card-body. The .card-link class adds a blue color to any link, and a hover effect. -->
                         <h5 class="card-title">Click to give  User access</h5>
                         <p class="card-text"></p>
                         <a href="accesos/addacceso.php" class="btn btn-outline-info stretched-link btn-block">Add User access</a> <!--Add the .stretched-link class to a link inside the card, and it will make the whole card clickable and hoverable (the card will act as a link) -->
                     </div>
                  </div>
                </div>
                <div class="col  mt-3 mx-3">
                  <div class="card" style="width:250px">
                     <img class="card-img-top" src="http://localhost/esp32/imagenes/userEdit.png" alt="Card image" style="width:100%">
                     <div class="card-body">
                         <h5 class="card-title">Click to Edit User access</h5>
                         <p class="card-text"></p>
                         <a href="accesos/editacceso.php" class="btn btn-outline-success stretched-link btn-block">Edit User access</a>
                     </div>
                  </div>
                </div>
                <div class="col  mt-3 mx-3">
                  <div class="card" style="width:250px">
                     <img class="card-img-top" src="http://localhost/esp32/imagenes/userDelete.png" alt="Card image" style="width:100%">
                     <div class="card-body">
                         <h5 class="card-title">Click to Delete User access</h5>
                         <p class="card-text"></p>
                         <a href="#" class="btn btn-outline-danger stretched-link btn-block">Delete User access</a>
                     </div>
                  </div>
                </div>
              </div>
        </div>	
    </div>
  <!-- Finish Container-->  

<!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript" src="js/search.js"></script>
</body>
</html>