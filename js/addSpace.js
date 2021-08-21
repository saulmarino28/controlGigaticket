$(document).ready(function(){
	//console.log("hola");

	$('#addSpace').submit(function(e){
		e.preventDefault();
		var nombre= $('#name').val();
		var lugares= $('#lugares').val();
		//var habitaciones= $('#numHab').val();
		//var pisos= $('#pisos').val();
		//var fecha_registro= $('#fecha').val();
		//var tipo_habitacion= $('#tipo_habitacion option:selected').val();
		var datos = {
			'nombre': nombre,
			'lugares': lugares
			
		};
		console.log(datos);
		$.post('../db/addSpaceDB.php', datos, function(respuesta){
			respuesta = JSON.parse(respuesta);
			console.log(respuesta);
			if (respuesta[0]['respuesta'] == true) {
            
            	var msj="";
            	msj +=`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> Has agregado un Espacio.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                            `;
                $('#alertAS').empty();
                $('#alertAS').append(msj);
                console.log("hola");
            }
                else {
                	var msj="";
            		msj +=`
	                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
	                        <strong>Hola SaulMa!</strong> Ha ocurrido un error, el Espacio no se ha guardado correctamente.
	                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	                            <span aria-hidden="true">&times;</span>
	                        </button>
	                    </div>
                            	`;
                $('#alertAS').empty();
                $('#alertAS').append(msj);
                console.log("nohola");
                }
		});
	});
});