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
import MongoStoreBuilder from 'connect-mongo';
import cookieParser from 'cookie-parser';
import webpackConfig from '../webpack.dev.config';
import App from './app';
import routes from './routes';
import { mongo } from './config';
import getInitialState from './state';

const MongoStore = new MongoStoreBuilder(session);
const app = express();
const html = fs.readFileSync(`${__dirname}/../public/template.html`, 'utf8');
const appToken = fs.readFileSync(`${__dirname}/../app-token.txt`, 'utf8');
const port = process.env.NODE_PORT || 3000;

mongoose.connect(mongo.host, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongo.host}`);
});

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(multipartMiddleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: appToken,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(express.static('public'));
app.use('/api/v1', routes);
app.use((err, req, res, next) => {
  res.status(err.status).send(JSON.stringify(err));
});

app.get('/*', (req, res) => {
  getInitialState(req).then((initialState) => {
    const appString = renderToString(<App
      location={req.url}
      context={{}}
      initialState={initialState}
    />);
    const helmet = Helmet.renderStatic();
    const finalHtml = html
      .replace('<!--root-->', appString)
      .replace('<!--state-->', JSON.stringify(initialState).replace(/</g, '\\u003c'))
      .replace('<!--head-->', helmet.meta.toString() + helmet.link.toString() + helmet.title.toString());
    res.send(finalHtml);
  });
});
app.listen(port);
console.log(`Listening on port ${port}`);
