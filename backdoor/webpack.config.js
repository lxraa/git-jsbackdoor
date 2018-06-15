const path = require("path");

module.exports = {
	entry : './backdoor.js',
	output : {
		path:path.resolve(__dirname,"dist"),
		filename : "release.js"
	},
	mode : "development",
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
