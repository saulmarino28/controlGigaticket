


// Disable form submissions if there are invalid fields
$(document).ready(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        else {
          var name= $('#name').val();
          var lastName= $('#lastName').val();
          var email= $('#email').val();
          var phone= $('#phone').val();
          var hab= $('#hab').val();
          var rfid= $('#rfid').val();
          var fecha_i= $('#fecha_i').val();
          var fecha_f= $('#fecha_f').val();
          var hour_i= $('#hour_i').val();
          var hour_f= $('#hour_f').val();

          if (fecha_i > fecha_f ) {
            console.log("error wrong info");
            $('#wrongFecha').removeClass("invisible").addClass("visible");
            $('#wrongHora').removeClass("visible").addClass("invisible");
            event.preventDefault();
            event.stopPropagation();
             
             var msj="";
            msj +=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> ingresa una fecha inicial menor que la fecha final
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertAC').empty().append(msj);
              

        } 
        else if ((hour_i > hour_f)) {

           console.log("error wrong info");
           $('#wrongFecha').removeClass("visible").addClass("invisible");
           $('#wrongHora').removeClass("invisible").addClass("visible");
           event.preventDefault()
           event.stopPropagation();
           //console.log(hora_i);
           var msj="";
            msj +=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Hola SaulMa!</strong> ingresa una hora de egreso mayor que la hora de ingreso
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                                `;
                $('#alertAC').empty().append(msj);  
        
        } 
        else {
          console.log("ok processing info");
          $('#alertAC').empty();
          $('#wrongFecha').removeClass("visible").addClass("invisible");
          $('#wrongHora').removeClass("visible").addClass("invisible");
          event.preventDefault();
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
             
        }
        }        

        form.classList.add('was-validated');
      }, false);
    });
  }, false);
});