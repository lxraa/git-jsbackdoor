#!/usr/bin/env node
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/get",function(req , res){
	list = [];
	Object.keys(global.con_pool).forEach(function(k){
		list.push(k);
	})

	res.send(list.join("<br>"));
});

app.get("/show",function(req,res){
	id = req.query.id;

	if(global.con_pool[id] != undefined){
		console.log(global.con_pool[id]);
		res.send(global.con_pool[id].recv.data);
	}
	else{
		res.send("id error");
	}
	
})


app.listen(3000);


var WebsocketServer = require("websocket").server;
var http = require("http");


/*
	*	
	*	全局变量，同步信息用
	*
*/

var global = {
	con_pool : {
		//  ${key} : {
		// 	recv : {
		// 	},
		// 	con : ""		// connection句柄
		// }
	}

}


function checkMethod(str){
	var white_list = ["show"];
	for(var i = 0 ; i < white_list.length ; i++){
		if(str == white_list[i]){
			return true;
		}
		continue;
	}
	return false;
}

var method = {
	show : function(data){
		console.log("do show");
	},
}
/*
	*	
	*	创建httpserver，给websocket用
	*
*/


var server = http.createServer(function(request, response) {
    console.log("[*] " + (new Date()) + " Received request for " + request.url);
    response.writeHead(404);
    response.end();
});


server.listen(8080 , function(){
	console.log("[*] " + (new Date()) + " Server is listening on port 8080");
});

/*
	*	
	*	websocket监听
	*
*/

wsServer = new WebsocketServer({
	httpServer : server,
	autoAcceptConnections:false
}); 


wsServer.on("request",function(request){
	console.log(request);

	var connection = request.accept();

	console.log("[*] " + (new Date()) + " Connection accepted.");

	if(connection.key == undefined){
		connection.key = (new Date()).getTime();
	}
	
	global.con_pool[connection.key] = { recv : {} , con : 1 }
	global.con_pool[connection.key].con = connection;

	connection.on("message", function(message) {

        if (message.type === "utf8") {
            console.log("[*] Received Message: utf8Data");

            var recv = JSON.parse(message.utf8Data);
            if(recv.password == "lxraa"){
            	delete recv.password;
            	global.con_pool[connection.key].recv = recv;
            }
            else{
            	connection.sendUTF("- what?");
            	console.log("[*] （＞д＜） 非法连接！")
            	delete global.con_pool[connection.key];
            	connection.close();
            }
            
            console.log(global);
            // if(checkMethod(global.recv.cmd)){
            // 	method[global.recv.cmd](global.recv.data);
            // }

            //connection.sendUTF(message.utf8Data);
        }
        else if (message.type === "binary") {
            console.log("[*] Received Binary Message of " + message.binaryData.length + " bytes");
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on("close", function(reasonCode, description) {
    	delete global.con_pool[connection.key];
        console.log("[*] " + (new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
    });

})