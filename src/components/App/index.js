import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom'

const mainContainerStyle = {
  paddingTop: '50px',
  paddingBottom: '50px',
};
const avatarStyle = {
  borderRadius: '50%',
  height: '50px'
};

export default class App extends Component {
  render() {
    const { user : { user }} = this.props;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <title>App</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
        </Helmet>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">
              App
          </NavLink>
          {
            user && 
            <span className="navbar-brand">
              { user.login }
            </span>
          }
          {
            user && 
            <span className="navbar-brand">
              <img style={avatarStyle} className="img-fluid" src={ user.avatar } alt={ user.login }/>
            </span>
          }
          {
            ! user && 
            <span className="navbar-brand">
              <NavLink className="btn btn-primary" to="/auth/">
                Sign in
              </NavLink>
            </span>
          }
        </nav>
        <div style={mainContainerStyle}>
          { this.props.children }
        </div>
      </div>
    );
  }
}