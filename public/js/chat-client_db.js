var	socket = io.connect('http://localhost:5000'); //для чат-db поставив інший порт
window.onunload = function(){
	socket.disconnect();
}


window.onload = function(){


var content = document.getElementById("content");
var text = document.getElementById("text");
var form = document.getElementById("form");

//при загрузці 


form.onsubmit = function (){
	socket.emit("se",{message: text.value})
	text.value = "";
	 return false; //щоб без перезагрузки
}



socket.on("mess",function(data){
	var item = "";
	for(var i = 0; i<data.send.length; i++){
		item = item + data.send[i].login + ": " + data.send[i].msg + "</br>"
	}
	content.innerHTML = item;
})


socket.on("sen",function (data){
	content.innerHTML = content.innerHTML + data.login +": "+ data.msg + "</br>"
})


}



