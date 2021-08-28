$(document).ready(function(){
	//console.log("hola");
	$.get.("../db/MyProfileDB.php", function(res){
		var resp = res;
		console.log(resp);
	});
});