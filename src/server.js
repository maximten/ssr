import 'babel-polyfill';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app.js';
import fs from 'fs';
import webpack from 'webpack';
import webpackConfig from '../webpack.dev.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();
const html = fs.readFileSync(__dirname + '/../public/template.html', 'utf8');
const appString = renderToString(<App/>);
const finalHtml = html.replace('<!--root-->', appString);
const port = 3000;

if (process.env.NODE_ENV != 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static('public'));
app.get('/*', (req, res) => {
  res.send(finalHtml);
});
app.listen(port);
console.log(`Listening on port ${port}`);
