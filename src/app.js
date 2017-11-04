import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import history from './history';
import configureStore from './redux';
import Counter from './containers/Counter';

const Store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" component={() => <Counter />} />
            </Switch>
          </div>
        </Router>
      </Provider>    
    );
  }
}
