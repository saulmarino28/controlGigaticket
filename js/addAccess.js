$(document).ready(function() {
	obtenerDatos();

	$("#myInput").on("keyup", function() {

        var value = $(this).val().toLowerCase();
        busqueda = { 
            'busqueda':value
        };

        $.post("../db/busqueda.php", busqueda, function(respuesta){
            //console.log(respuesta);
            
            respuesta = JSON.parse(respuesta);
                    
            if (!(respuesta[0]['resp']==true)) {

                MostrarTabla(respuesta);
                $('#res').empty();

            } 
            else {

                var res="";
                res += `<h3>No hay resultados</h3>`;    
                $('#tableAA').empty();
                $('#res').empty();
                $('#res').append(res);

            }
        }); //cierra la busqueda a la DB 
    });	//cierra funcion de myInput
}); //cierra la la funcion principal

$(document).on('click', '#btn-access', function(){
    $("#accessModal").modal("show");
    var atributo = {'id_user' : $(this).parent().parent().attr('id')};
    //console.log(atributo);
    $.post('../db/editClientDB.php', atributo, function(respuesta){
      //console.log(respuesta);
      data = JSON.parse(respuesta);
       //console.log(data[0]['IdC']);

        $('#id_update').val(data[0]['IdC']);
        $('#name').val(data[0]['name']);
        $('#lastName').val(data[0]['lastName']);
        $('#fecha_i').val(data[0]['fecha_i']);
        $('#fecha_f').val(data[0]['fecha_f']);
        $('#hour_i').val(data[0]['hour_i']);
        $('#hour_f').val(data[0]['hour_f']);

 
   }); //cierra la funcion de acceso la DB
   
}); //cierra la funcion principal

$('#search').on('submit',function(){

                var fecha_i = $('#fecha_i').val(),
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
                  	if (!(respuesta[0]['resp']==false)) {
	            		$('#accessModal').modal('hide');
	                	//MostrarTabla(respuesta);
	                	var msj="";
			            msj +=`
			                <div class="alert alert-danger alert-dismissible fade show" role="alert">
			                    <strong>Espacio ocupado!</strong>
			                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			                        <span aria-hidden="true">&times;</span>
			                    </button>
			                </div>
			            `;
			            $('#tableSpaces').empty();
			             $('#tableSpaces').append(msj);

	            	}
		            else {
		            	$('#accessModal').modal('hide');
		                //MostrarTabla(respuesta);
		                var msj="";
		            	msj +=`
		                    <div class="alert alert-success alert-dismissible fade show" role="alert">
		                        <strong>Espacio vacio!</strong> 
		                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		                            <span aria-hidden="true">&times;</span>
		                        </button>
		                    </div>
		                                `;
		                $('#tableSpaces').empty();
		                $('#tableSpaces').append(msj);
		            }
                });   
            }
        });



    
       
            

              

	function obtenerDatos() {
		$.get('../db/registrosDB.php' , function(respuesta) {
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
					<tr id="${respuesta[i]['IdC']}">
	                	<td class="bg-warning">${respuesta[i]['IdC']}</td>
	                    <td>${respuesta[i]['name']}</td>
	                    <td >${respuesta[i]['lastName']}</td>
	                    <td>${respuesta[i]['fecha_i']}</td>
	                    <td>${respuesta[i]['fecha_f']}</td>
	                    <td>${respuesta[i]['hour_i']}</td>
	                    <td>${respuesta[i]['hour_f']}</td>
	                    <td ><button  class="btn btn-warning  btn-sm " name="btn-access" id ="btn-access">Dar Acceso</button></td>
	                </tr>
				`;
			}
			$('#tableAA').empty();
			$('#tableAA').append(tableBody);
	}

	function ValidarFechaHora(datos) {


	}