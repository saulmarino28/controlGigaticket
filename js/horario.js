$(document).ready(function(){
   // obtenerDatos();
   
   $('#horarios').submit(function(e){
        e.preventDefault();
        var name= $('#name').val();
        var lastName= $('#lastName').val();
        var email= $('#email').val();
        var phone= $('#phone').val();
        var space= $('#space').val();
        var fecha_i= $('#fecha_i').val();
        var rfid= $('#rfid').val();
        var fecha_f= $('#fecha_f').val();
        var hora_i= $('#hora_i').val();
        var hora_f= $('#hora_f').val();
        

        var datos = {
            'name': name,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'space': space,
            'fecha_i': fecha_i,
            'fecha_f': fecha_f,
            'rfid': rfid,
            'hora_i': hora_i,
            'hora_f': hora_f
        };
        console.log(datos);
        
        $.post('horariosDB.php', datos, function(respuesta){
           respuesta = JSON.parse(respuesta);
            console.log(respuesta);
            /*
            if (respuesta[0]['respuesta'] == true) {
                var msj="";
                msj +=`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> Has agregado un cliente.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                            `;
                $('#alertAC').empty();
                $('#alertAC').append(msj);
            }
                else {
                    var msj="";
                    msj +=`
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Hola SaulMa!</strong> Ha ocurrido un error el cliente no se ha guardado correctamente.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                                `;
                $('#alertAC').empty();
                $('#alertAC').append(msj);
                }
                */
         
        });
        
    });


    
});
function obtenerDatos(){
    $.get("horariosDB.php", function(respuesta){
        console.log(respuesta);

                //respuesta=JSON.stringify(respuesta);
        respuesta = JSON.parse(respuesta);
                
       console.log(respuesta);

    });
} 