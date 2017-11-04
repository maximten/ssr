var webpack = require('webpack');

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
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: [/node_modules/, /public/],
    }, ],
  },
};