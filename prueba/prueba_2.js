
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
    $.post("prueba2DB.php", comparaRFID, function(respuesta) {
        //console.log(respuesta);
        matching = JSON.parse(respuesta);
        console.log(matching);
        if (matching[0]['respuesta'] == true) {
            console.log("Acceso correcto");
        }
        else {
            console.log("Acceso denegado");
        }
        var respuestaMatch = {
             match : matching[0]['respuesta'],
             saludo : "Hola"
        };
        console.log(respuestaMatch);
        //respuestaMatch = JSON.stringify(respuestaMatch);
        //console.log(respuestaMatch);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                // Typical action to be performed when the document is ready:
                document.getElementById("successprueba").innerHTML = xhttp.responseText;
            }
        };
        xhttp.onerror = function () {
            document.getElementById("errorprueba").innerHTML = "Status code is " + this.status + " click F12 and check what is the problem on console";
        };
        /*
        var params = {
            ip: "saul",
            gw: "192.168.1.1",
            nm: "192.168.1.255"
        } 
        */
        xhttp.open("POST", "http://192.168.1.81/getMatch", true);
     
        xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
     
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(respuestaMatch)) // Make sure to stringify

       /*
        $.post("http://192.168.1.81/getMatch",respuestaMatch, function(res) {
            //res = JSON.parse(res);
            console.log(res);
        });
        */
    });
 });
 }