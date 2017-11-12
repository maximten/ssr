import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

const initialState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

ReactDOM.hydrate(<App initialState={initialState}/>, document.getElementById('root'));
if (module.hot) {
  module.hot.accept();
}
