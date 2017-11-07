const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    __dirname + '/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/, /public/],
      }, 
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^mongoose$/),
    new webpack.HotModuleReplacementPlugin(),
  ]
};