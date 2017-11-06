import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, BrowserRouter, StaticRouter } from 'react-router-dom';

import history from './history';
import configureStore from './redux';
import Counter from './containers/Counter';
import Info from './components/Info';

const Store = configureStore();

export default class App extends Component {
  render() {
    const { location, context } = this.props;
    const Router = process.env.NODE_SIDE == 'server' ? StaticRouter : BrowserRouter;
    const routerProps = process.env.NODE_SIDE == 'server' ? {
      location,
      context
    } : {}; 
    return (
      <Provider store={Store}>
        <Router {...routerProps}>
          <div>
            <Switch>
              <Route exact path="/" component={() => <Counter />} />
              <Route exact path="/info/" component={() => <Info />} />
            </Switch>
          </div>
        </Router>
      </Provider>    
    );
  }
}
