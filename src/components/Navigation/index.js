import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom'

const avatarStyle = {
  borderRadius: '50%',
  height: '50px'
};

export default class Navigation extends Component {
  render() {
    const { user : { user }} = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
            App
        </NavLink>
        {
          user && 
          <span className="navbar-brand">
            { user.email }
          </span>
        }
        {
          user && 
          <span> 
            <span className="navbar-brand">
              <img style={avatarStyle} className="img-fluid" src={ user.avatar } alt={ user.login }/>
            </span>
            <span className="navbar-brand">
              <a href="#" className="nav-link" onClick={this.props.logout}>
                Logout
              </a>
            </span>
          </span> 
        }
        {
          ! user &&
          <span> 
            <span className="navbar-brand">
              <NavLink className="nav-link" to="/login/">
                Sign in
              </NavLink>
            </span>
            <span className="navbar-brand">
              <NavLink className="nav-link" to="/register/">
                Sign up
              </NavLink>
            </span>
          </span> 
        }
      </nav>
    );
  }
}