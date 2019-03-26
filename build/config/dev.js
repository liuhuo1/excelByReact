module.exports = {
	devServer: {
		port: '8800',
		// 请求代理服务
		proxy: {
			'/api': {
				// 这里改为项目后端 API 接口 Host
				target: '',
				// 支持跨域调用
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
