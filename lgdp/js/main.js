window.onload = initAll;



function initAll(){
	var canvas = document.getElementById("canvas");
	if (canvas.getContext()){
		var context = canvas.getContext('2d');
	} else{
		alert("Please Enable Canvas Features");
	}
}
