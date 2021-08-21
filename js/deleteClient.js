$(document).ready(function(){
    obtenerDatos();
   // hacerclic();


    $('#btn-actualizar').click(function(){  

        obtenerDatos();  
        
    });
    
    $("#myInput").on("keyup", function() {

        var value = $(this).val().toLowerCase();

        busqueda = { 

            'busqueda':value
        };

        $.post("../db/busqueda.php", busqueda, function(respuesta){

            console.log(respuesta);
            /*$("#tabla1 tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });*/
            respuesta = JSON.parse(respuesta);
                    
            var text = "";
            if (!(respuesta[0]['resp']==true)) {

                for(i = 0; i<respuesta.length; i++){
                    text += `
                        <tr id="${respuesta[i]['IdC']}">
                            <td class="bg-danger " >${respuesta[i]['IdC']}</td>
                            <td >${respuesta[i]['name']}</td>
                            <td >${respuesta[i]['lastName']}</td>
                            <td >${respuesta[i]['email']}</td>
                            <td >${respuesta[i]['phone']}</td>
                            <td >${respuesta[i]['rfid']}</td>
                            <td >${respuesta[i]['hab']}</td>
                            <td >${respuesta[i]['fecha_i']}</td>
                            <td >${respuesta[i]['fecha_f']}</td>
                            <td >${respuesta[i]['hour']}</td>
                            <td ><button  class="btn btn-outline-danger  btn-sm delete" name="btn-del" id = "btn-delete">X</button></td>
                        </tr>`;                   
                            
                        }
                        $('#res').empty();
                        $('#tabla1').empty();
                        $('#tabla1').append(text);
            } 
            else {
               
                var res="";
                res += `<h3>No hay resultados</h3>`;
                    
                $('#tabla1').empty();
                $('#res').empty();
                $('#res').append(res);
            }

        }); 
    });
});
$(document).on('click', '#btn-delete', function(){
    $("#deleteModal").modal("show");
    var atributo = {'id_user' : $(this).parent().parent().attr('id')};
    console.log(atributo);
   $.post('../db/editClientDB.php', atributo, function(respuesta){
      console.log(respuesta);
      data = JSON.parse(respuesta);
       console.log(data[0]['IdC']);

        $('#id_delete').val(data[0]['IdC']);
 
   });
   

});
$('#eliminar').on('click',function(){
    //console.log("eliminando");
       var id = $('#id_delete').val();
        
        var datos_enviar = {
            'id' : id
         
        };
       //console.log(datos_enviar);
       $.post('../db/deleteClientDB.php', datos_enviar, function(respuesta){
        console.log(respuesta);
        res = JSON.parse(respuesta);
        //console.log(res);
        if (res[0]['resp'] == true) {
            $('#deleteModal').modal('hide');
            var msj="";
            msj +=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> Has eliminado un cliente.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertDC').empty();
                $('#alertDC').append(msj);
                obtenerDatos();
        }
        else{
            $('#deleteModal').modal('hide');
            var msj="";
            msj +=`
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> No se ha podido eliminar el cliente.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertDC').empty();
                $('#alertDC').append(msj);
        }
       });
});
function obtenerDatos(){
    $.get("../db/registrosDB.php", function(respuesta){
        console.log(respuesta);

                //respuesta=JSON.stringify(respuesta);
        respuesta = JSON.parse(respuesta);
                
        var texto = "";
       
        for(i = 0; i<respuesta.length; i++){
            texto += `
                <tr id="${respuesta[i]['IdC']}">
                    <td class="bg-danger " >${respuesta[i]['IdC']}</td>
                    <td >${respuesta[i]['name']}</td>
                    <td >${respuesta[i]['lastName']}</td>
                    <td >${respuesta[i]['email']}</td>
                    <td >${respuesta[i]['phone']}</td>
                    <td >${respuesta[i]['rfid']}</td>
                    <td >${respuesta[i]['hab']}</td>
                    <td >${respuesta[i]['fecha_i']}</td>
                    <td >${respuesta[i]['fecha_f']}</td>
                    <td >${respuesta[i]['hour']}</td>
                    <td ><button  class="btn btn-outline-danger  btn-sm delete" name="btn-del" id = "btn-delete">X</button></td>
                </tr>`;                   
                    
                }

                $('#tabla1').empty();
                $('#tabla1').append(texto);

    });
}   