const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { path: appRoot } = require('app-root-path')

module.exports = {
  stats: 'errors-warnings',
  entry: {
    server: path.resolve(appRoot, './server/index'),
  },
  output: {
    path: path.resolve(appRoot, './dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
  },
}
