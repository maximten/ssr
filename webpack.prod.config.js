const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    __dirname + '/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
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
    new webpack.IgnorePlugin(/^\/models\//),
    new UglifyJSPlugin()
  ],
};