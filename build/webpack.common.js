const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config/index');
const resolve = require('./config/path');
module.exports = {
	entry: config.entry,
	output: config.output,
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.styl$/,
				loaders: ['style-loader', 'css-loader', 'stylus-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				loader: "ts-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: config.templatePath,
			inject: 'body'
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json'],
		alias: {
			'@src': resolve('src'),
			'@canvas': resolve('src/canvas')
		}
	}
}
