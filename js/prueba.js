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
  $('#addClient').submit(function(e){
    e.preventDefault();
    var name= $('#name').val();
    var lastName= $('#lastName').val();
    var email= $('#email').val();
    var phone= $('#phone').val();
    var hab= $('#hab').val();
    var rfid= $('#rfid').val();
    var fecha_i= $('#fecha_i').val();
    var fecha_f= $('#fecha_f').val();
    var hour_i= $('#hour_i').val();
    var hour_f= $('#hour').val();

    var datos = {
            'name': name,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'hab': hab,
            'fecha_i': fecha_i,
            'fecha_f': fecha_f,
            'rfid': rfid,
            'hour_i': hour_i,
            'hour_f': hour_f
          };
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

  });  
    */
});