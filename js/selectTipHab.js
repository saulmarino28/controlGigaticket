$(document).ready(function(){
    //console.log("hola mundo");
    $.get("../db/select_tipo_habitacion.php", function(respuesta){
        respuesta= JSON.parse(respuesta);
        //console.log(respuesta);
        var text = "";
        //console.log(respuesta.length);
        for (var i = 0; i < respuesta.length; i++) {
            text += `
                    <option value='${respuesta[i]['Id_tipo_hab']}'>${respuesta[i]['Nombre']}</option>
            `;
        }
        //console.log(text);
        $("#tipo_habitacion").append(text);
    });
});