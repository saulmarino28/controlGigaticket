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
 

    
    */
});