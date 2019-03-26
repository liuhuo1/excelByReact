const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config/index');

module.exports = {
	entry: config.entry,
	output: config.output,
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
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
}
