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
                    
            if (!(respuesta[0]['resp']==false)) {

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
    console.log(atributo);
    $.post('../db/editAccessDB.php', atributo, function(respuesta){
      //console.log(respuesta);
      data = JSON.parse(respuesta);
       //console.log(data[0]['IdA']);

        $('#id_update').val(data[0]['IdA']);
        $('#name').val(data[0]['name']);
        $('#space').val(data[0]['space']);
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

        var datos= {
            'name': name,   
            'fecha_i': fecha_i,
            'fecha_f': fecha_f,
            'hora_i': hora_i,
            'hora_f': hora_f,
            'nombre_espacio': nombre_espacio
        };
        $.post('../db/searchSpaceDB.php', datos, function(espacio){
            espacio= JSON.parse(espacio);
            console.log(espacio);
            console.log("Para editar primero remueve este acceso");
            //MostrarTablaAcceso(espacio, datos);
        });   
    }
}); //cierra la funcion para buscar un espacio
 
//*/

$('#ac').on('click',function(){
    //console.log("actualizando");
       var id = $('#id_update').val(),
            name = $('#name').val(),
            space = $('#space').val(),
            fecha_i = $('#fecha_i').val(),
            fecha_f = $('#fecha_f').val(),
            hour_i = $('#hour_i').val(),
            hour_f = $('#hour_f').val();

       var datos_enviar = {
            'id' : id,
            'name': name,
            'space': space,
            'fecha_i': fecha_i,
            'fecha_f': fecha_f,
            'hour_i': hour_i,
            'hour_f': hour_f
        };
       //console.log(datos_enviar);
       $.post('../db/updateAcceso.php', datos_enviar, function(respuesta){
        //console.log(respuesta);
        var res = JSON.parse(respuesta), 
            msj="";
        //console.log(res);
        if (res[0]['resp'] == true) {
            $('#editModal').modal('hide');
            
            msj +=`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Has actualizado el acceso del cliente!</strong> 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertEditAccess').empty().append(msj);
                obtenerDatos();
        }
        else {
            $('#editModal').modal('hide');
            
            msj +=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong> No se ha actualizado el acceso del cliente!</strong><br>
                        Error
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertEditAccess').empty().append(msj);
                obtenerDatos();
        }
       });
});


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