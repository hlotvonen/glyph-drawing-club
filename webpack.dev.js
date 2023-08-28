const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	mode: "development",
	output: {
		filename: "bundle.js",
		publicPath: "/static/",
		devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
	},
	devtool: "cheap-module-source-map",
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
			exclude: /node_modules/,
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
		watchContentBase: true,
		compress: true,
		port: 3000
	},
}