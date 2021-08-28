
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
        <li class="nav-item active">
          <a class="nav-link" href="index.php"><strong>Inicio</strong> <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="clientes.php"> <strong>Usuarios</strong></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="accesos.php"><strong>Accesos</strong></a>
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
  <div class="container text-center">
    <div id="inicio" class="container"><br>
      <h3 class="h3">Principal</h3><br>
      
   <div class="jumbotron  "> <!--A jumbotron indicates a big grey box for calling extra attention to some special content or information. -->
        <?php 
           
           echo "<h4> Enhorabuena, bienvenid@ '" .$_SESSION['usuario'] ."' </h4><br>";
           echo "<h5> ¡Ya formas parte de nosotros! </h5> <br>";
        ?>
        <div class="row justify-content-center m-3">
        <div class="col-sm-3 text-center">
           <a href='sesiones/cerrarSesionUGT.php' class="btn btn-outline-warning mt-5">Cerrar Sesión</a>
        </div>
      </div>
   </div>            
   <img src="http://localhost/esp32/imagenes/door2.jpg" class="door my-3 rounded mx-auto d-block img-fluid" alt="welcome" width="500" height="400"> <!--img-fluid resizes the img -->

    </div>
  </div>
  <!-- Finish Container-->  

<!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>
</html>