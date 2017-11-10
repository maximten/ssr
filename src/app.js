import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, BrowserRouter, StaticRouter } from 'react-router-dom';

import history from './history';
import configureStore from './redux';
import Counter from './containers/Counter';
import AppContainer from './containers/AppContainer';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import Info from './components/Info';

export default class Main extends Component {
  render() {
    const { location, context, initialState } = this.props;
    const Router = process.env.NODE_SIDE == 'server' ? StaticRouter : BrowserRouter;
    const routerProps = process.env.NODE_SIDE == 'server' ? {
      location,
      context
    } : {}; 
    const Store = initialState ? configureStore(initialState): configureStore();
    return (
      <Provider store={Store}>
        <Router {...routerProps}>
          <div>
            <Switch>
              <Route exact path="/" component={() => <AppContainer><PostsContainer/></AppContainer>} />
              <Route exact path="/posts/:slug" component={({match : { params : { slug }}}) => <AppContainer><PostContainer slug={slug}/></AppContainer>} />
              <Route exact path="/login/" component={() => <AppContainer><LoginContainer/></AppContainer>} />
              <Route exact path="/register/" component={() => <AppContainer><RegisterContainer/></AppContainer>} />
            </Switch>
          </div>
        </Router>
      </Provider>    
    );
  }
}
