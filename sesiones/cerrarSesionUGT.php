<?php 
session_start();
session_destroy();
header("Location:../../gigaticket/usuarios.php");
 ?>