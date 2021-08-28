$(document).ready(function(){
  obtenerDatos();
   /*
    $('#btn-actualizar').click(function(){      
        obtenerDatos();
    });
    */

    $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
   /* $("#tabla1 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    }); */

    busqueda = { 

        'busqueda':value
    };

    $.post('db/busqueda.php', busqueda, function(respuesta){

        console.log(respuesta);
        respuesta= JSON.parse(respuesta);
         var text = "";
            if (!(respuesta[0]['resp']==true)) {

                for(i = 0; i<respuesta.length; i++){
                    text += `
                        <tr id="${respuesta[i]['IdC']}">
                            <td class="bg-success " >${respuesta[i]['IdC']}</td>
                            <td >${respuesta[i]['name']}</td>
                            <td >${respuesta[i]['lastName']}</td>
                            <td >${respuesta[i]['email']}</td>
                            <td >${respuesta[i]['phone']}</td>
                            <td >${respuesta[i]['rfid']}</td>
                            <td >${respuesta[i]['hab']}</td>
                            <td >${respuesta[i]['fecha_i']}</td>
                            <td >${respuesta[i]['fecha_f']}</td>
                            <td >${respuesta[i]['hour_i']}</td>
                            <td >${respuesta[i]['hour_f']}</td>
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

    function obtenerDatos(){
        $.get('db/registrosDB.php', function(respuesta){
            console.log(respuesta);

            //respuesta=JSON.stringify(respuesta);
            respuesta = JSON.parse(respuesta);
            
            var texto = "";
            for(i = 0; i<respuesta.length; i++){
                texto += `
                <tr>
                    <td class="bg-success">${respuesta[i]['IdC']}</td>
                    <td>${respuesta[i]['name']}</td>
                    <td>${respuesta[i]['lastName']}</td>
                    <td >${respuesta[i]['email']}</td>
                    <td>${respuesta[i]['phone']}</td>
                    <td>${respuesta[i]['rfid']}</td>
                    <td>${respuesta[i]['hab']}</td>
                    <td>${respuesta[i]['fecha_i']}</td>
                    <td>${respuesta[i]['fecha_f']}</td>
                    <td>${respuesta[i]['hour_i']}</td>
                    <td>${respuesta[i]['hour_f']}</td>
                </tr>`;
                
            }

            $('#tabla1').empty();
            $('#tabla1').append(texto);
            

        });
    }


});
