document.getElementById("rfid").addEventListener("click",
	enviarRfid, false); 	


function enviarRfid() {
//setInterval(enviarRfid,2000);
$.get("http://192.168.1.81/sendRfid", function(lectId) {
   
    //console.log(lectId);
    lectId = JSON.stringify(lectId);
    lectId = JSON.parse(lectId);
    console.log(lectId);
    console.log(lectId['rfid']);
$("#rfid").val(lectId['rfid']);
 });
 }


$(document).ready( function() {
    //funcion para la buscar un espacio
$('#addClient').submit( function(e){

    var name = $('#name').val(),
        lastName = $('#lastName').val(),
        email = $('#email').val(),
        phone = $('#phone').val(),
        rfid = $('#rfid').val(),
        fecha_i = $('#fecha_i').val(),
        fecha_f = $('#fecha_f').val(),
        hora_i = $('#hour_i').val(),
        hora_f = $('#hour_f').val(),
        nombre_espacio =  $('#spaces option:selected').val();

    if(name == " " || lastName == "" || email== "" || phone == "" || rfid == "" || fecha_f == "" || fecha_i == " " || hora_i == " " || hora_f == " " || nombre_espacio== " " ) {
        console.log("campos vacios porfa llenalos");
        e.preventDefault();
        e.stopPropagation();
    }    
    else if (fecha_i > fecha_f ) {
        console.log("error wrong info");
        $('#wrongFecha').removeClass("invisible").addClass("visible");
        $('#wrongHora').removeClass("visible").addClass("invisible");
        e.preventDefault();
        e.stopPropagation();
                    
    } 
    else if ((hora_i > hora_f)) {
        console.log("error wrong info");
        $('#wrongFecha').removeClass("visible").addClass("invisible");
        $('#wrongHora').removeClass("invisible").addClass("visible");
        e.preventDefault();
        e.stopPropagation();
        //console.log(hora_i);  
              
    } 
    else {
        console.log("ok processing info");
        $('#wrongFecha').removeClass("visible").addClass("invisible");
        $('#wrongHora').removeClass("visible").addClass("invisible");
        e.preventDefault();

        var datos_horario= {
                'name': name,   
                'fecha_i': fecha_i,
                'fecha_f': fecha_f,
                'hora_i': hora_i,
                'hora_f': hora_f,
                'nombre_espacio': nombre_espacio
            },
            datos_cliente= {
                'name': name,
                'lastName': lastName,
                'email' : email,
                'phone' : phone,
                'rfid' : rfid,   
                'fecha_i': fecha_i,
                'fecha_f': fecha_f,
                'hora_i': hora_i,
                'hora_f': hora_f,
                'nombre_espacio': nombre_espacio
            };
            
        //console.log(datos_espacio);
        //console.log(datos_clientes);
        $.post('../db/searchSpaceDB.php', datos_horario, function(espacio){
            espacio = JSON.parse(espacio);
            console.log(espacio);
            console.log("If false Agrega acceso otherwise it's unable");
            
            MostrarTablaAcceso(espacio, datos_horario, datos_cliente);
        }); 
    }
}); //cierra la funcion para buscar un espacio
});

 function MostrarTablaAcceso(espacio, datos_horario, datos_cliente) {
        //console.log(datos);
        var tableBody = "";
        if ((espacio[0]['resp'] != false)) {
            console.log("ocupado");
            fillSpace = "ocupado";
            MostrarAlertaAC(fillSpace);
            tableBody += `<h3> Espacio ocupado</h3>`;
            tableBody += TableHead();
            tableBody += `<tbody class="text-center">`;
            for (var i = 0 ; i < espacio.length ; i++) {
                
                tableBody +=`
                        <tr id="${espacio['id_horario']}">
                            <td class="bg-danger " >${espacio[i]['id_horario']}</td>
                            <td >${espacio[i]['usuario']}</td>
                            <td >${espacio[i]['espacio']}</td>
                            <td >${espacio[i]['fecha_inicio']}</td>
                            <td >${espacio[i]['fecha_final']}</td>
                            <td >${espacio[i]['hora_inicio']}</td>
                            <td >${espacio[i]['hora_final']}</td>
                        </tr>       
                `;
            }
            tableBody +=`   </tbody>          
                         </table>
                        `;
            $('#tableAC').empty().append(tableBody);
                    
        }
        else { 
            $('#tableAC').empty();
            console.log("vacio, agregando");
            //console.log(datos_horario);
            //console.log(datos_cliente);

            $.post('../db/addClientDB.php', datos_cliente, function(respuesta){
                console.log(respuesta);
                var res = JSON.parse(respuesta);
                if (res[0]['respuesta'] == true) {
                    clientAdded = res[0]['respuesta'];
                    MostrarAlertaAC(clientAdded);

                    $.post('../db/AddHorarioDB.php', datos_horario, function(respuesta) {
                        var status = JSON.parse(respuesta);
                        console.log(status);
                        if (status[0]['respuesta'] == true) {
                            horarioAdded = status[0]['respuesta'];
                            MostrarAlertaAA(horarioAdded);     
                        }
                        else {
                            horarioNoAdded = status[0]['respuesta'];
                            MostrarAlertaAA(horarioNoAdded);    
                        } 
                         
                    }); //cierra el post() para insertar un horario a la DB
                }
                else  {
                    clientNoAdded = res[0]['respuesta'];
                    MostrarAlertaAC(clientNoAdded); 

                } //cierre else si no se agrego cliente
            }); //cierre del post (para agregar el cliente)
        } //cierre else (si esta vacio el espacio 
    } //cierre de la funcion MostrarTablaAcceso


    function MostrarAlertaAC(edoClient ) {
        var msj="";
        if(edoClient == true) {
            
            msj +=`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Cliente agregado correctamente!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            $('#alertAC').empty().append(msj);
            
        }
        else if (edoClient == false) {
            msj +=`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error no se ha podido agregar el cliente!</strong><br>
                     Este correo talvez ya esta siendo usado por otro usuario
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            $('#alertAC').empty().append(msj);
                         
                        
        }
        else {      
            msj +=`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>¡Espacio ocupado! No puedes elegir este espacio  </strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
           $('#alertAC').empty().append(msj);
        }   
    }

    function MostrarAlertaAA(edoHorario) {
        var msj="";
        if(edoHorario == true) { 
            msj +=`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Has dado acceso al cliente!</strong> 
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            $('#alertAA').empty().append(msj);
            
        }
        else {
            msj +=`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong> No se ha podido dar acceso al cliente!</strong><br>                  
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            $('#alertAA').empty().append(msj);                             
        }
    }

    function TableHead() {
        var tableHead = ""; 
        tableHead +=`
            <table class="table table-primary table-hover table-bordered">
                <thead class="thead-dark text-center">
                    <tr class="">
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Espacio</th>
                        <th>Fecha ingreso</th>
                        <th>Fecha egreso</th>
                        <th>Hora ingreso</th>
                        <th>Hora egreso</th>
                    </tr>
                </thead>
        `;
        return tableHead; 
        
    }   