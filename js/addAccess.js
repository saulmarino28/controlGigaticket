$(document).ready(function() {
	obtenerDatos();

	//funcion para la busqueda en la tabla principal
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
                $('#res').empty().append(res);

            }
        }); //cierra la busqueda a la DB 
    });	//cierra funcion de myInput
}); //cierra la la funcion principal

//funcion para el boton dar acceso
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

//funcion para la buscar un espacio
$('#search').on('submit',function(){
	var name = $('#name').val(),
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
           	MostrarTablaAcceso(espacio, datos);
        });   
    }
}); //cierra la funcion para buscar un espacio
  

$(document).on('click', '#btn-asignarAcceso', function() {
	 		
	var nuevoHorario = {
		'name' : $(this).parents("tr").find("td")[1].innerHTML,
		'nombre_espacio' : $(this).parents("tr").find("td")[2].innerHTML,
		'fecha_i' : $(this).parents("tr").find("td")[3].innerHTML,
		'fecha_f' : $(this).parents("tr").find("td")[4].innerHTML,
		'hora_i' : $(this).parents("tr").find("td")[5].innerHTML,
		'hora_f' : $(this).parents("tr").find("td")[6].innerHTML

	};
	console.log(nuevoHorario);
	DisableButton();
	$.post('../db/AddHorarioDB.php', nuevoHorario, function(respuesta) {

		var msj="",
      	status = JSON.parse(respuesta);
      	console.log(status);
    	 if (status[0]['respuesta'] == true) {
            
            var msj="";
            msj +=`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Has dado acceso al cliente!</strong> 
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
                        <strong> No se ha podido dar acceso al cliente!</strong><br>
                       
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertSpaces').empty().append(msj);
                
        }  
	}); //cierra el post() para insertar un horario a la DB
}); // cierra funcion del boton asignar acceso     
            

              

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

	function MostrarTablaAcceso(espacio, datos) {
		//console.log(datos);
		var estado, tableBody = "";
		if (!(espacio[0]['resp']==false)) {
	        $('#accessModal').modal('hide');
	        estado = true;
	        MostrarAlerta(estado);
	    	for (var i = 0 ; i < espacio.length ; i++) {
	    		tableBody += `<h3> Espacio ocupado</h3>`;
	    		tableBody += TableHead();
                tableBody +=`

                	
		              <tbody class="text-center">
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
		    	tableBody += TableHead();
                tableBody +=`
		              <tbody class="text-center">
		              	<tr id="${datos['name']}">
	                        <td class="bg-primary" >?</td>
	                        <td id="${datos['name']}">${datos['name']}</td>
	                        <td >${datos['nombre_espacio']}</td>
	                        <td >${datos['fecha_i']}</td>
	                        <td >${datos['fecha_f']}</td>
	                        <td >${datos['hora_i']}</td>
	                        <td >${datos['hora_f']}</td>
	                        <td ><button class="btn btn-outline-primary  btn-sm" name="btn-AA" id = "btn-asignarAcceso">Asignar espacio</button></td>
	                    </tr>       
		              </tbody>          
		            </table>
                `;
            
            $('#tableAccess').empty().append(tableBody);
    
		}
	} //cierre de la funcion MostrarTablaAcceso


	function MostrarAlerta(estado) {
		var msj="";
		if(estado == false) {
			
			msj +=`
			    <div class="alert alert-success alert-dismissible fade show" role="alert">
			        <strong>¡Espacio vacio!</strong>
			        Presiona el boton para Asignar espacio
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
			        <strong>¡Espacio ocupado!</strong>
			        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			            <span aria-hidden="true">&times;</span>
			        </button>
			    </div>
			`;
			$('#alertSpaces').empty().append(msj);
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
	
	function DisableButton() {
		var prueba = document.getElementById('btn-asignarAcceso'); //.setAttribute("disabled",true);
		prueba.disabled = true;

	}