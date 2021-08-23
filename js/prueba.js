document.getElementById("rfid").addEventListener("click",
  enviarRfid, false);   


function enviarRfid() {
//setInterval(enviarRfid,2000);
$.get("http://192.168.1.81/sendRfid", function(lectId) {
   
    //console.log(lectId);
    lectId = JSON.stringify(lectId);
    lectId = JSON.parse(lectId);
    console.log(lectId);
    console.log(lectId['rfid']);
$("#rfid").val(lectId['rfid']);
 });
 }

$(document).ready(function(){
  console.log("hola");
  /*
    $.post('../db/addClientDB.php', datos, function(respuesta){
      respuesta = JSON.parse(respuesta);
      console.log(respuesta);
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
                          <strong>Hola SaulMa!</strong> Ha ocurrido un error el cliente no se ha guardado correctamente.<br>
                          Este correo ya  esta vinculado a alguien mas
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                              `;
                $('#alertAC').empty();
                $('#alertAC').append(msj);
                }
         
    });
    */
    
});