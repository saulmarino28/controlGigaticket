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
                $.post('../db/searchSpaceDB.php', datos, function(espacio){
                  	espacio= JSON.parse(espacio);
                  	console.log(espacio);
                  	MostrarTablaAcceso(espacio);
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
			$('#tableAA').empty().append(tableBody);
	}

	function ValidarFechaHora(datos) {


	}

	function MostrarTablaAcceso(espacio) {

		var estado, tableBody = "";
		if (!(espacio[0]['resp']==false)) {
	        $('#accessModal').modal('hide');
	        estado = true;
	        MostrarAlerta(estado);
	    	for (var i = 0 ; i < espacio.length ; i++) {

                tableBody +=`

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
		              <tbody class="text-center">
		              	<tr id="${espacio[i]['id_horario']}">
	                        <td class="bg-danger " >${espacio[i]['id_horario']}</td>
	                        <td >${espacio[i]['usuario']}</td>
	                        <td >${espacio[i]['espacio']}</td>
	                        
	                        <td >${espacio[i]['fecha_inicio']}</td>
	                        <td >${espacio[i]['fecha_final']}</td>
	                        <td >${espacio[i]['hora_inicio']}</td>
	                        <td >${espacio[i]['hora_final']}</td>
	                        <td ><button  class="btn btn-outline-danger  btn-sm" name="btn-AA" id = "btn-AA" disabled>Acceso</button></td>
	                    </tr>       
		              </tbody>          
		            </table>

                `;
            }
            $('#tableAccess').empty().append(tableBody);
	                
	    }
		else {
		    $('#accessModal').modal('hide');
		    //MostrarTabla(respuesta);
		    estado = false;
		    MostrarAlerta(estado);
		    for (var i = 0 ; i < datos.length ; i++) {

                tableBody +=`

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
		              <tbody class="text-center">
		              	<tr id="">
	                        <td class="bg-primary " ></td>
	                        <td ></td>
	                        <td >${datos[i]['nombre_espacio']}</td>
	                        
	                        <td >${datos[i]['fecha_i']}</td>
	                        <td >${datos[i]['fecha_f']}</td>
	                        <td >${datos[i]['hora_i']}</td>
	                        <td >${datos[i]['hora_f']}</td>
	                        <td ><button class="btn btn-outline-primary  btn-sm" name="btn-AA" id = "btn-AA">Acceso</button></td>
	                    </tr>       
		              </tbody>          
		            </table>

                `;
            }
            $('#tableAccess').empty().append(tableBody);

		    
		}
	}


	function MostrarAlerta(estado) {
		var msj="";
		if(estado == false) {
			
			msj +=`
			    <div class="alert alert-success alert-dismissible fade show" role="alert">
			        <strong>Espacio vacio!</strong>
			        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			            <span aria-hidden="true">&times;</span>
			        </button>
			    </div>
			`;
			$('#alertSpaces').empty().append(msj);
			
		}
		else {
			
			msj +=`
			    <div class="alert alert-danger alert-dismissible fade show" role="alert">
			        <strong>Espacio ocupado!</strong>
			        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			            <span aria-hidden="true">&times;</span>
			        </button>
			    </div>
			`;
			$('#alertSpaces').empty().append(msj);
		}
	}