$(document).ready(function(){
    obtenerDatos();
    // hacerclic();
    $("#myInput").on("keyup", function() {

        var value = $(this).val().toLowerCase();
        busqueda = { 
            'busqueda':value
        };

        $.post("../db/busquedaH.php", busqueda, function(respuesta){

            //console.log(respuesta);
            respuesta = JSON.parse(respuesta);
                    
            if (!(respuesta[0]['resp'] == false)) {

                MostrarTabla(respuesta);
                $('#res').empty();
                        
            } 
            else {
               
                var res="";
                res += `<h3>No hay resultados</h3>`;   
                $('#tableEditAccess').empty();
                $('#res').empty().append(res);
            }

        }); //cierra la busqueda a la DB  
    }); //cierra funcion de myInput
}); //cierra la la funcion principal


$(document).on('click', '#btn-editA', function(){
    $("#editModal").modal("show");
    var atributo = {'id_access' : $(this).parent().parent().attr('id')};
    //console.log(atributo);
    $.post('../db/editAccessDB.php', atributo, function(respuesta){
      //console.log(respuesta);
      var data = JSON.parse(respuesta);
       //console.log(data);

        $('#id_update').val(data[0]['IdA']);
        $('#name').val(data[0]['name']);
        $('#spaces').val(data[0]['space']);
        $('#fecha_i').val(data[0]['fecha_i']);
        $('#fecha_f').val(data[0]['fecha_f']);
        $('#hour_i').val(data[0]['hour_i']);
        $('#hour_f').val(data[0]['hour_f']);

 
   });   
});

// TO DO
//Falta asignar esta parte para una mejor funcionalidad
//* 
//funcion para la buscar un espacio
$('#formAccess').on('submit',function(){

    var id = $('#id_update').val(),
        name = $('#name').val(),
        fecha_i = $('#fecha_i').val(),
        fecha_f = $('#fecha_f').val(),
        hora_i = $('#hour_i').val(),
        hora_f = $('#hour_f').val(),
        nombre_espacio =  $('#spaces option:selected').val();

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
        $('#wrongFecha').removeClass("visible").addClass("invisible");
        $('#wrongHora').removeClass("visible").addClass("invisible");
        event.preventDefault();

        var datos_enviar= {
            'id': id,
            'name': name,   
            'fecha_i': fecha_i,
            'fecha_f': fecha_f,
            'hora_i': hora_i,
            'hora_f': hora_f,
            'nombre_espacio': nombre_espacio
        };
        //console.log(datos);
        $.post('../db/searchSpaceEditDB.php', datos_enviar, function(espacio){
            espacio = JSON.parse(espacio);
            //console.log(espacio);
            //console.log("If false edita acceso otherwise it's unable");
            
            MostrarTablaAcceso(espacio, datos_enviar);
        });   
    }
}); //cierra la funcion para buscar un espacio
 
//*/


function obtenerDatos() {
        $.get('../db/horariosDB.php' , function(respuesta) {
            //console.log(respuesta);
            respuesta = JSON.parse(respuesta);
            //console.log(respuesta);
            MostrarTabla(respuesta);
        });
    }

    function MostrarTabla(respuesta)  {
        var tableBody = "";
            for (var i = 0 ; i < respuesta.length ; i++) {

                tableBody +=`
                    <tr id="${respuesta[i]['IdA']}">
                        <td class="bg-info " >${respuesta[i]['IdA']}</td>
                        <td >${respuesta[i]['name']}</td>
                        <td >${respuesta[i]['space']}</td>
                        
                        <td >${respuesta[i]['fecha_i']}</td>
                        <td >${respuesta[i]['fecha_f']}</td>
                        <td >${respuesta[i]['hour_i']}</td>
                        <td >${respuesta[i]['hour_f']}</td>
                        <td ><button  class="btn btn-outline-info  btn-sm editA" name="btn-editA" id = "btn-editA">Editar Acceso</button></td>
                    </tr>
                `;
            }
            $('#tableEditAccess').empty().append(tableBody);
    }
    ///TO DO
    ///adecuar funcion. para editar acceso
    function MostrarTablaAcceso(espacio, datos_enviar) {
        //console.log(datos);
        var tableBody = "";
        if ((espacio[0]['resp'] != false)) {
            console.log("ocupado");
            $('#editModal').modal('hide');
            NoAccess = true;
            MostrarAlerta(NoAccess);
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
                            <td ><button  class="btn btn-outline-danger  btn-sm" name="btn-AA" id = "btn-asignarAcceso" disabled>Asignar espacio</button></td>
                        </tr>       

                `;
            }
            tableBody += `</tbody>          
                        </table>`
                    ;
            $('#table2').empty().append(tableBody);
                    
        }
        else {
            $('#editModal').modal('hide');
            $('#table2').empty();
            console.log("vacio, actualizando");
            //estado = false;
            //MostrarAlerta(estado);
            $.post('../db/updateAcces.php', datos_enviar, function(respuesta){
                //console.log(respuesta);
                var res = JSON.parse(respuesta);

                if (res[0]['resp'] == true) {
                    //$('#editModal').modal('hide');
                    Access = false;
                    MostrarAlerta(Access);
                    obtenerDatos();
                }
                else {
                    //$('#editModal').modal('hide');
                    ErrorAccess = "error";
                    MostrarAlerta(ErrorAccess);
                    
                }
            });//cierre del post (para actualizar el acceso)
    
        }//cierre else (si esta vacio el espacio 
    } //cierre de la funcion MostrarTablaAcceso


    function MostrarAlerta(estado) {
        var msj="";
        if(estado == false) {
            
            msj +=`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Acceso actualizado correctamente!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            $('#alertEditAccess').empty().append(msj);
            
        }
        else if (estado == true) {
            msj +=`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>¡Espacio ocupado! No puedes elegir este espacio  </strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
           $('#alertEditAccess').empty().append(msj);             
                        
        }
        else {
            
            msj +=`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error no se ha podido actualizar el acceso!</strong><br>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
          `;
            $('#alertEditAccess').empty().append(msj);
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
                    <th>Acceso</th>
                    </tr>
                </thead>
        `;
        return tableHead; 
        
    }   