var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'source-map',
	entry: [
		'./src/index.js'
	],
	output: {
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
			query: {
				presets: [
					'react',
					'es2015'
				]
			},
			include: path.join(__dirname, 'src')
		}]
	}
}
