const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';
const VERSION = require('./package.json').version;

module.exports = {
	entry: './lib/index.jsx',
	devtool: PROD ? null : 'source-map',
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.jsx', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: [
						'latest',
						'react'
					],
					plugins: [
						'transform-decorators-legacy',
						'transform-class-properties',
						'transform-object-rest-spread'
					]
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|gif|jpg|png|cur)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				query: {
					name: './assets/[name].[hash].[ext]'
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				query: {
					attrs: ['img:src', 'link:href']
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				API_URI: JSON.stringify(process.env.API_URI),
				VERSION: JSON.stringify(VERSION)
			}
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html'
		}),
		new HtmlWebpackExternalsPlugin(
			[
				{
					name: 'react',
					var: 'React',
					path: 'react/dist/react.min.js'
				},
				{
					name: 'react-dom',
					var: 'ReactDOM',
					path: 'react-dom/dist/react-dom.min.js'
				},
				{
					name: 'redux',
					var: 'Redux',
					path: 'redux/dist/redux.min.js'
				},
				{
					name: 'react-redux',
					var: 'ReactRedux',
					path: 'react-redux/dist/react-redux.min.js'
				},
				{
					name: 'redux-actions',
					var: 'ReduxActions',
					path: 'redux-actions/dist/redux-actions.min.js'
				},
				{
					name: 'redux-promise-middleware',
					var: 'ReduxPromiseMiddleware',
					path: 'redux-promise-middleware/dist/ReduxPromiseMiddleware.min.js'
				},
				{
					name: 'superagent',
					var: 'superagent',
					path: 'superagent/superagent.js'
				},
				{
					name: 'lodash',
					var: '_',
					path: 'lodash/lodash.min.js'
				},
				{
					name: 'bootstrap',
					path: 'bootstrap/dist/css/bootstrap.min.css'
				}
			],
			{basedir: __dirname}
		),
		new CopyWebpackPlugin([
			{from: 'node_modules/bootstrap/dist/', to: 'vendor/bootstrap/dist/'}
		]),
		new ExtractTextPlugin('bundle.css')
	]
};

