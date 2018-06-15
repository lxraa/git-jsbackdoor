const express = require("express");
const cookie_parser = require("cookie-parser");
var router = express.Router();

router.use(cookie_parser());
router.use(function(req,res,next){
	if(req.cookies.password == "0#1p8@Qee*"){
		console.log("admin");
		next();
	}	
	else{
		res.send("error");
	}
});

router.use("/script",require("./script"));
router.use("/proxy",require("./proxy"));
router.use("/session",require("./session"));




module.exports = router;
