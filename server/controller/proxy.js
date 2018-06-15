const express = require("express");
const utils = require("../lib/utils");


var router = express.Router();

router.use(function(req,res,next){
	res.append("Access-Control-Allow-Origin","*");
	next();
});


router.use("/proxy",function(req, res, next){
	var concat = require('concat-stream');
	req.pipe(concat(function(data){
		req.body = data;
		next();
	}));

});

router.all("/proxy",async function(req,res){

	var id = req.query.id;
	


	if(!checkSessionId(id)){
		res.send("艹，好像断连了<a href='/sessions'>sessions</a>");
		return ;
	}

	await (async function(req,res){
		var id = req.query.id;
		var session = getSession(id);

		var origin_request = {
			headers : req.headers,
			method : req.method,
			url : req.query.url,
			body : req.body.toString()
		}
		var s = {cmd:"request",data:origin_request};
		session.sendUTF(JSON.stringify(s));
		while(true){
			// 0.1秒检查一次是否有返回

			await utils.sleep(100);
			if(global.cache.con_pool[id].proxy_response){
				var response = global.cache.con_pool[id].proxy_response;
				response.status == 0 ? res.status(501) : res.status(response.status);
				res.send(response.responseText);
				return true;
			}
		}

	})(req,res);

});

module.exports = router;