const path = require("path")
const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	mode: "production",
	devtool: "cheap-module-source-map",
	entry: [
		"./src/index.js"
	],
	plugins: [
		new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new MiniCssExtractPlugin()
	],
	optimization: {
		chunkIds: "total-size", 
		moduleIds: "size",
		nodeEnv: "production",
		flagIncludedChunks: true,
		sideEffects: true,
		usedExports: true,
		concatenateModules: true,
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			},
			minSize: 30000,
			maxAsyncRequests: 5,
		},
		noEmitOnErrors: true,
		minimize: true,
		minimizer: [new TerserPlugin()],
		removeAvailableModules: true,
		removeEmptyChunks: true,
		mergeDuplicateChunks: true,
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js",
		publicPath: "/dist/"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	performance: {
		hints: false
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
				"css-loader",
			],
		}]
	}
}
