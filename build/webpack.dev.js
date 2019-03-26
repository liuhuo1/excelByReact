const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const config = require('./config');
module.exports = merge.smart(commonConfig, {
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
  ],
	devServer: {
		// 开启前端路径回路映射，子路径映射到根路径，由前端路由框架来解析
		historyApiFallback: true,
		// 关闭 Host 检查，同网段其他设备，可通过内网 IP 访问本机服务（需要配合 host: '0.0.0.0'）使用
		disableHostCheck: true,
		host: '0.0.0.0',
		inline: true,
		hot: true,
		...config.devServer
	}
})
