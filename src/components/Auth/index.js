import React, { Component } from 'react';
import classNames from 'classnames';

export default class Auth extends Component {
  register = (e) => {
    e.preventDefault();
    const { register } = this.props;
    const formData = new FormData(e.target);
    register(formData);
  }
  login = (e) => {
    e.preventDefault();
    const { login } = this.props;
    const formData = new FormData(e.target);
    login(formData);
  }
  render() {
    const { register, login } = this;
    const { user: { user, error } } = this.props;
    const loginClass = classNames('form-control', { 'is-invalid' : error && error.type === 'login' });
    let loginError = (error && error.type === 'login') ? error.message.common : '';
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
            <div className="card">
              <div className="card-body">
                <h2>Sign in</h2>
                <form onSubmit={login}>
                  <div className="form-group">
                    <label>Login</label>
                    <input name="login" type="text" className={ loginClass } placeholder="username"/>
                    <div className="invalid-feedback">
                      { loginError }
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className={ loginClass }/>
                  </div>
                  <button type="submit" className="btn btn-primary">Sign up</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2>Sign up</h2>
                <form onSubmit={register}>
                  <div className="form-group">
                    <label>Login</label>
                    <input name="login" type="text" className="form-control" placeholder="username"/>
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" placeholder="name@example.com"/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label>Avatar</label>
                    <input name="avatar" type="file" className="form-control-file"/>
                  </div>
                  <button type="submit" className="btn btn-primary">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}