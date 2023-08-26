const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	devtool: "eval",
	mode: "development",
	output: {
		filename: "bundle.js",
		publicPath: "/static/"
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin()
	],
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: {
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/preset-env",
						["@babel/preset-react", {"runtime": "automatic"}]
					],
					
				}
			},
			include: path.join(__dirname, "src")
		},
		{
			test: /\.css$/i,
			include: path.resolve(__dirname, "src"),
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader"
			],
		}]
	},
	devServer: {
		publicPath: "/static/",
		contentBase: path.resolve(__dirname, ""),
		//watchContentBase: true,
		compress: true,
		port: 3000
	},
}