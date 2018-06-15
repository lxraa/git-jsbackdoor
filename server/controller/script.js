const express = require("express");
const body_parser = require("body-parser");

var router = express.Router();


router.use(body_parser.json());

router.use(function(req,res,next){
	res.append("Content-type","application/json");
	res.append("Access-Control-Allow-Origin","*");
	next();
});

router.options("/*",function(req,res){
	res.append("Access-Control-Allow-Methods","POST,GET");
	res.append("Access-Control-Allow-Headers","Content-Type");
	res.send("ok");
});


// {scripts:["string1","string2"]}
router.post("/addScripts",function(req,res){
	var scripts = req.body.scripts;
	if(scripts){
		for(var i = 0;i<scripts.length;i++){
			global.cache.scripts.push(scripts[i]);
			console.log("[*] Add script ",scripts[i]);
		}
		res.send("ok")
		return ;
	}
	res.send("需要一个scripts参数");
});

router.post("/clearScripts",function(req,res){
	global.cache.scripts.splice(0,global.cache.scripts.length);
	console.log("[*] Clear scripts");
	res.send("ok");
});

router.post("/getScripts",function(req,res){
	res.send(JSON.stringify(global.cache.scripts));
});

module.exports = router;