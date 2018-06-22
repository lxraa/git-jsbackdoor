const express = require("express");
var router = express.Router();


router.use("/script",require("./script"));
router.use("/proxy",require("./proxy"));
router.use("/session",require("./session"));
router.use("/i",require("./i"));

router.get("/index",function(req,res){
	res.send("index");
});


module.exports = router;