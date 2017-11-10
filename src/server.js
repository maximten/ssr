import 'babel-polyfill';
import mongoose from 'mongoose';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import multipartMiddleware from 'connect-multiparty';
import Helmet from 'react-helmet';
import session from 'express-session';
import webpackConfig from '../webpack.dev.config.js';
import App from './app.js';
import routes from './routes';
import config from './config';
import getInitialState from './state';

const app = express();
const html = fs.readFileSync(__dirname + '/../public/template.html', 'utf8');
const appToken = fs.readFileSync(__dirname + '/../app-token.txt', 'utf8');
const port = process.env.NODE_PORT || 3000;

mongoose.connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.host}`);
});

if (process.env.NODE_ENV != 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));  
  app.use(webpackHotMiddleware(compiler));
}

app.use(multipartMiddleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: appToken,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static('public'));
app.use('/api/v1', routes);
app.use((err, req, res, next) => {
  res.status(err.status).send(JSON.stringify(err));
});

app.get('/*', (req, res) => {
  getInitialState(req).then((initialState) => {
    const appString = renderToString(<App location={req.url} context={{}} initialState={initialState}/>);
    const helmet = Helmet.renderStatic();
    const finalHtml = html
    .replace('<!--root-->', appString)
    .replace('<!--head-->', helmet.meta.toString() + helmet.link.toString() + helmet.title.toString());
    res.send(finalHtml);
  });
});
app.listen(port);
console.log(`Listening on port ${port}`);
