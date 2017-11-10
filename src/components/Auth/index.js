import React, { Component } from 'react';
import classNames from 'classnames';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

export default class Auth extends Component {
  render() {
    const { user: { user } } = this.props;
    return (
      user ?
      <div className="container">
        <div className="row">
          <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h1 className="text-center">You are logged in!</h1>
                </div>
              </div>
          </div>
        </div>
      </div>
      :
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <LoginForm {...this.props}/>
          </div>
          <div className="col-md-6">
            <RegisterForm {...this.props}/>
          </div>
        </div>
      </div>
    );
  }
}