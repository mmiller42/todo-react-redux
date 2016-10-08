const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const PROD = process.env.NODE_ENV === 'production';

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
				test: /\.(eot|woff|woff2|ttf|svg|gif|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
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
			ENV: {
				NODE_ENV: process.env.NODE_ENV,
				API_URI: PROD ? 'https://api-ubacslavwb.now.sh' : 'http://localhost:3000'
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
					url: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js'
				},
				{
					name: 'react-dom',
					var: 'ReactDOM',
					url: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js'
				},
				{
					name: 'redux',
					var: 'Redux',
					url: 'https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.js'
				},
				{
					name: 'react-redux',
					var: 'ReactRedux',
					url: 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.5/react-redux.js'
				},
				{
					name: 'react-router',
					var: 'ReactRouter',
					url: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.4.1/ReactRouter.js'
				},
				{
					name: 'react-router-redux',
					var: 'ReactRouterRedux',
					url: 'https://cdnjs.cloudflare.com/ajax/libs/react-router-redux/4.0.5/ReactRouterRedux.js'
				},
				{
					name: 'redux-actions',
					var: 'ReduxActions',
					path: 'redux-actions/dist/redux-actions.js'
				},
				{
					name: 'redux-promise-middleware',
					var: 'ReduxPromiseMiddleware',
					path: 'redux-promise-middleware/dist/ReduxPromiseMiddleware.js'
				},
				{
					name: 'superagent',
					var: 'superagent',
					path: 'superagent/superagent.js'
				},
				{
					name: 'lodash',
					var: '_',
					url: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.3/lodash.js'
				},
				{
					name: 'bootstrap',
					url: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css'
				}
			],
			{basedir: __dirname}
		),
		new ExtractTextPlugin('bundle.css')
	]
};

