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
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2>Sign in</h2>
                <form onSubmit={login}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" className={loginClass} placeholder="john@doe.com" />
                    <div className="invalid-feedback">
                      { loginError && loginError.message.login }
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className={loginClass} />
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
