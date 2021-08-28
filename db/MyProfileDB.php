<?php 
    
     session_start();
     $userSession = $_SESSION['usuario'];
     echo json_encode($userSession);
 ?>