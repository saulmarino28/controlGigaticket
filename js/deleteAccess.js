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
            /*$("#tabla1 tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });*/
            respuesta = JSON.parse(respuesta);
                    
            var text = "";
            if (!(respuesta[0]['resp']==true)) {

                for(i = 0; i<respuesta.length; i++){
                    text += `
                        <tr id="${respuesta[i]['IdA']}">
                            <td class="bg-danger " >${respuesta[i]['IdA']}</td>
                            <td >${respuesta[i]['name']}</td>
                            <td >${respuesta[i]['space']}</td>
                           
                            <td >${respuesta[i]['fecha_i']}</td>
                            <td >${respuesta[i]['fecha_f']}</td>
                            <td >${respuesta[i]['hour_i']}</td>
                            <td >${respuesta[i]['hour_f']}</td>
                            <td ><button  class="btn btn-outline-danger  btn-sm deleteA" name="btn-deleteA" id = "btn-deleteA">Eliminar Acceso</button></td>
                        </tr>`;                    
                            
                        }
                        $('#res').empty();
                        $('#tableDeleteAccess').empty().append(text);
            } 
            else {
               
                var res="";
                res += `<h3>No hay resultados</h3>`;
                    
                $('#tableDeleteAccess').empty();
                $('#res').empty().append(res);
            }

        }); 
    });
});
$(document).on('click', '#btn-deleteA', function(){
    $("#deleteModal").modal("show");
    var atributo = {'id_access' : $(this).parent().parent().attr('id')};
    //console.log(atributo);
   $.post('../db/editAccessDB.php', atributo, function(respuesta){
      //console.log(respuesta);
      data = JSON.parse(respuesta);
       //console.log(data[0]['IdA']);

        $('#id_delete').val(data[0]['IdA']);
 
   });
   

});
$('#eliminar').on('click',function(){
    //console.log("eliminando");
       var id = $('#id_delete').val();
        
        var datos_enviar = {
            'id' : id
         
        };
       //console.log(datos_enviar);
       $.post('../db/deleteAccessDB.php', datos_enviar, function(respuesta){
        //console.log(respuesta);
        res = JSON.parse(respuesta);
        //console.log(res);
        var msj="";
        if (res[0]['resp'] == true) {
            $('#deleteModal').modal('hide');
            
            msj +=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong> Has eliminado un acceso!</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertDeleteAccess').empty().append(msj);
                obtenerDatos();
        }
        else{
            $('#deleteModal').modal('hide');
            
            msj +=`
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>No se ha podido eliminar el acceso!</strong> 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertDeleteAccess').empty().append(msj);
        }
       });
});
function obtenerDatos(){
    $.get("../db/horariosDB.php", function(respuesta){
        //console.log(respuesta);

                //respuesta=JSON.stringify(respuesta);
        respuesta = JSON.parse(respuesta);
                
        var texto = "";
       
        for(i = 0; i<respuesta.length; i++){
            texto += `
                <tr id="${respuesta[i]['IdA']}">
                    <td class="bg-danger " >${respuesta[i]['IdA']}</td>
                    <td >${respuesta[i]['name']}</td>
                    <td >${respuesta[i]['space']}</td>
                   
                    <td >${respuesta[i]['fecha_i']}</td>
                    <td >${respuesta[i]['fecha_f']}</td>
                    <td >${respuesta[i]['hour_i']}</td>
                    <td >${respuesta[i]['hour_f']}</td>
                    <td ><button  class="btn btn-outline-danger  btn-sm deleteA" name="btn-deleteA" id = "btn-deleteA">Eliminar Acceso</button></td>
                </tr>`;                   
                    
                }

                $('#tableDeleteAccess').empty().append(texto);

    });
}   