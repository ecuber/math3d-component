// Followed https://medium.com/@christossotiriou/speed-up-nodejs-server-side-development-with-webpack-4-hmr-8b99a932bdda
// with some modifications.
const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
// const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  name: 'server',
  externalsPresets: { node: true },
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  plugins: [new webpack.ProvidePlugin({
    window: 'global/window',
  })],
  externals: [nodeExternals()],
  output: {
    globalObject: 'this',
    path: path.resolve(__dirname, 'build/'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: [/node_modules/],
        use:{
          loader: 'babel-loader',
          options: require('./.babelrc.json')
        }
      }
    ]
  }
};