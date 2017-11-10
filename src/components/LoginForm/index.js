import React, { Component } from 'react';
import classNames from 'classnames';

export default class LoginForm extends Component {
  login = (e) => {
    e.preventDefault();
    const { login } = this.props;
    const formData = new FormData(e.target);
    login(formData);
  }
  render() {
    const { login } = this;
    const { user: { user, loginError } } = this.props;
    const loginClass = classNames('form-control', { 'is-invalid': loginError });
    return (
      <div className="card">
        <div className="card-body">
          <h2>Sign in</h2>
          <form onSubmit={login}>
            <div className="form-group">
              <label>Login</label>
              <input name="login" type="text" className={ loginClass } placeholder="username"/>
              <div className="invalid-feedback">
                { loginError && loginError.message.login }
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
    );
  }
}