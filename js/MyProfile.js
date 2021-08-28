$(document).ready(function() {
	//console.log("hola");
	$.get("../db/MyProfileDB.php", function(res) {
		res = JSON.parse(res);
		console.log(res);
		console.log(res[0]['name']);
		
		var texto = "";
            
        texto += `
       
		
		<ul class="list-group list-group-flush h5">
			<li class="list-group-item bg-info"></li>
			<li class= "list-group-item bg-info" id="name">${res[0]['name']} ${res[0]['lastName']}</li>
			<li class="list-group-item  bg-info" id="phone">${res[0]['phone']}</li>
			<li class="list-group-item  bg-info " id="email">${res[0]['email']}</li>
			<li class="list-group-item bg-info" id="userName">${res[0]['userName']}</li>
			<li class="list-group-item bg-info" id="typeUser">${res[0]['typeUser']}</li>
			<li class="list-group-item bg-info"></li>
		</ul>`;   
            
     	$('#cardProfile').empty();
     	$('#cardProfile').append(texto);
	});
});