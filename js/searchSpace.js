
$(document).ready(function(){
	//console.log("hola mundo");
	$.get("../db/SpacesDB.php", function(res){
		res = JSON.parse(res);
		console.log(res);
		var texto ="";
		for (var i = 0; i <res.length; i++) {
			texto += `
					  <option id=${res[i]['id_espacios']} >${res[i]['nombre_habitacion']} </option>
					`; 

		}
		$('#spaces').append(texto);
	});

	/*
	$('#enviar').click(function(){
	//e.preventDefault();
	
	var forms = document.getElementsByClassName('needs-validation');
    
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();

        }
        else {
        	var fecha_i = $('#fecha_i').val();
		var fecha_f = $('#fecha_f').val();
		var hora_i = $('#hour_i').val();
		var hora_f = $('#hour_f').val();
		var nombre_espacio =  $('#tipo_habitacion option:selected').val();
		if ((fecha_i > fecha_f) || (hora_i > hora_f) ) {
           console.log("error wrong info");

           event.preventDefault();
           event.stopPropagation();
           //console.log(hora_i);
           var msj="";
            msj +=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> ingresa una fecha y/o hora inicial menor que la final
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertSS').empty();
                $('#alertSS').append(msj);
            	

        } else {
        	console.log("ok processing info");
        	event.preventDefault();
			//console.log(nombre_espacio);
			//console.log(hora_i);
			var datos= {
						'fecha_i': fecha_i,
						'fecha_f': fecha_f,
						'hora_i': hora_i,
						'hora_f': hora_f,
						'nombre_espacio': nombre_espacio
						};
			$.post('searchSpace2DB.php', datos, function(respuesta){
				respuesta= JSON.parse(respuesta);
				console.log(respuesta);
			});		
		}
        }
        form.classList.add('was-validated');
      });
    }); 
		

    
	$('#search').submit(function(e){
		e.preventDefault();
		var fecha_i = $('#fecha_i').val();
		var fecha_f = $('#fecha_f').val();
		var hora_i = $('#hour_i').val();
		var hora_f = $('#hour_f').val();
		var nombre_espacio =  $('#tipo_habitacion option:selected').val();
		//console.log(nombre_espacio);
		var datos= {
					'fecha_i': fecha_i,
					'fecha_f': fecha_f,
					'hora_i': hora_i,
					'hora_f': hora_f,
					'nombre_espacio': nombre_espacio
					};
	$.post('searchSpace2DB.php', datos, function(respuesta){
		respuesta= JSON.parse(respuesta);
		console.log(respuesta);
	});		

	});
    
        
        
    });
*/
	

});