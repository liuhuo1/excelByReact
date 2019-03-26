const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const config = require('./config')
const commonConfig = require('./webpack.config.common')

process.env.NODE_ENV = 'production';

module.exports = merge.smart(commonConfig, {
	mode: 'production',
	optimization: {
		minimizer: [
      // 压缩 js
      new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
    ],
		splitChunks: {
			// 切割代码块，提取为独立的 chunk 文件
			chunks: 'all',
		},
	},
	plugins: [
    // 每次编译之前，清空上一次编译的文件
    new CleanWebpackPlugin([config.output.path], {
			root: process.cwd()
		}),
  ],
})
