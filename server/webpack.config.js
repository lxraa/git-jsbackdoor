const path = require("path");

var base_dir = "./scripts-debug/"
module.exports = {
	entry : {
		miner : base_dir + 'miner.js'
	},
	output : {
		path:path.resolve(__dirname,"scripts"),
		filename : "release.js"
	},
	mode : "production",
	module : {
		rules:[
		{
			test:/\.css$/,
			loader : "css-loader"
		},
		{
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file-loader'
		},
		{
            test: /\.vue$/,
            loader: 'vue'
        }
        ]
	}
}
