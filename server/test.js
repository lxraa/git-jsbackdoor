var ws = new WebSocket("ws://localhost:8080");

ws.onopen = function(evt){
	console.log("[*] opened");
	var data = document.getElementsByTagName("html")[0].innerHTML;
	var cmd = "show";
	s = {"data":data,"cmd":cmd,"password":"lxraa"};
	ws.send(JSON.stringify(s));
}

ws.onmessage = function(evt){
	console.log("[*] recv"+evt.data);
}


ws.onclose = function(evt){
	console.log("[*] closed");
}


