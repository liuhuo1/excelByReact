const resolve = require('./path');
const devConfig = require('./dev');
const prodConfig = require('./prod');
let config = (process.env.NODE_ENV === 'production' ? prodConfig : devConfig);
module.exports = {
	entry: {
		index: resolve('src/index.tsx')
	},
	output: {
		path: resolve('dist'),
		filename: 'static/js/[name].js',
		publicPath: ''
	},
	templatePath: resolve('src/index.html'),
	...config
}
