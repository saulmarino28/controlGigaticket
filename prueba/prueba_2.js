
document.getElementById("rfid").addEventListener("click",
    ObtenerRFID, false); 

function ObtenerRFID() {
//setInterval(enviarRfid,2000);
$.get("http://192.168.1.81/sendRfid", function(lectId) {
   
    //console.log(lectId);
    lectId = JSON.stringify(lectId);
    lectId = JSON.parse(lectId);

    var comparaRFID = {
        'rfid': lectId['rfid']
    };
    console.log(lectId);
    console.log(comparaRFID);
    $("#rfid").val(lectId['rfid']);
    $.post("prueba2DB.php", comparaRFID, function(match) {
        //console.log(respuesta);
        match = JSON.parse(match);
        console.log(match);
        if (match[0]['respuesta'] == true) {
            console.log("Acceso correcto");
        }
        else {
            console.log("Acceso denegado");
        }
        var respuestaMatch = {
            'match' : match[0]['respuesta'],
            'saludo' : "Hola"
        };
        console.log(respuestaMatch);
        respuestaMatch = JSON.stringify(respuestaMatch);
        console.log(respuestaMatch);
        $.post("http://192.168.1.81/getMatch",respuestaMatch, function(res) {
            //res = JSON.parse(res);
            console.log(res);
        });
    });
 });
 }