$(document).ready(function(){
    obtenerDatos();
   // hacerclic();


    $('#btn-actualizarS').click(function(){  

        obtenerDatos();  
        
    });
    
    $("#myInput").on("keyup", function() {

        var value = $(this).val().toLowerCase();

        busqueda = { 

            'busqueda':value
        };

        $.post("../db/busquedaS.php", busqueda, function(respuesta){

            console.log(respuesta);
            /*$("#tabla1 tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });*/
            respuesta = JSON.parse(respuesta);      
            var text = "";
            if (!(respuesta[0]['resp']==true)) {

                for(i = 0; i<respuesta.length; i++){
                    text += `
                        <tr id="${respuesta[i]['id_espacios']}">
                            <td class="bg-info " >${respuesta[i]['id_espacios']}</td>
                            <td >${respuesta[i]['nombre_habitacion']}</td>
                            <td >${respuesta[i]['fecha_reg']}</td>
                            <td >${respuesta[i]['spaces']}</td>
                            <td ><button  class="btn btn-outline-info  btn-sm edit" name="btn-edi" id = "btn-edit">Editar</button></td>
                        </tr>`;                   
                            
                        }
                        $('#res').empty();
                        $('#tablaS').empty();
                        $('#tablaS').append(text);
            } 
            else {
               
                var res="";
                res += `<h3>No hay resultados</h3>`;
                    
                $('#tablaS').empty();
                $('#res').empty();
                $('#res').append(res);
            }

        }); 
    });
});
$(document).on('click', '#btn-edit', function(){
    $("#editModalS").modal("show");
    var atributo = {'id_space' : $(this).parent().parent().attr('id')};
    console.log(atributo);
    $.post('../db/editSpaceDB.php', atributo, function(respuesta){
      console.log(respuesta);
      data = JSON.parse(respuesta);
       console.log(data[0]['id_espacios']);

        $('#id_updateS').val(data[0]['id_espacios']);
        $('#name').val(data[0]['nombre_habitacion']);
        $('#fecha_reg').val(data[0]['fecha_reg']);
        $('#spaces').val(data[0]['spaces']);
       

 
   });
   

});
$('#actualizarS').on('click',function(){
    //console.log("actualizando");
       var id = $('#id_updateS').val();
        var name = $('#name').val();
         var fecha_reg = $('#fecha_reg').val();
        var spaces = $('#spaces').val();
    

        var datos_enviar = {
            'id' : id,
            'name': name,
            'fecha_reg': fecha_reg,
            'spaces': spaces
           
        };
       console.log(datos_enviar);
       $.post('../db/updateSpace.php', datos_enviar, function(respuesta){
        //console.log(respuesta);
        res = JSON.parse(respuesta);
        console.log(res);
        if (res[0]['resp'] == true) {
            $('#editModalS').modal('hide');
            var msj="";
            msj +=`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> Has actualizado un Espacio.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertES').empty();
                $('#alertES').append(msj);
                obtenerDatos();
        }
        else {
            $('#editModalS').modal('hide');
            var msj="";
            msj +=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> ERROR No se ha actualizado el Espacio.<br>Nombre repetido.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertES').empty();
                $('#alertES').append(msj);
                obtenerDatos();
        }
       });
});
function obtenerDatos(){
    $.get("../db/registrosSDB.php", function(respuesta){
        console.log(respuesta);

                //respuesta=JSON.stringify(respuesta);
        respuesta = JSON.parse(respuesta);
                
        var texto = "";
       
        for(i = 0; i<respuesta.length; i++){
            texto += `
                <tr id="${respuesta[i]['id_espacios']}">
                    <td class="bg-info " >${respuesta[i]['id_espacios']}</td>
                    <td >${respuesta[i]['nombre_habitacion']}</td>
                    <td >${respuesta[i]['fecha_reg']}</td>
                    <td >${respuesta[i]['spaces']}</td>
                    <td ><button  class="btn btn-outline-info  btn-sm edit" name="btn-edi" id = "btn-edit">Editar</button></td>
                </tr>`;                   
                    
                }

                $('#tablaS').empty();
                $('#tablaS').append(texto);

    });
}   