import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

export default class RegisterForm extends Component {
  register = (e) => {
    e.preventDefault();
    const { register } = this.props;
    const formData = new FormData(e.target);
    register(formData);
  }
  render() {
    const { register } = this;
    const { user: { user, registerError } } = this.props;
    const classes = _.mapValues({ 
      login: '', email: '', password: '',
    }, (item, key) => {
      return classNames('form-control', { 'is-invalid': registerError && registerError.message[key] });
    });
    return (
      <div className="card">
        <div className="card-body">
          <h2>Sign up</h2>
          <form onSubmit={register}>
            <div className="form-group">
              <label>Login</label>
              <input name="login" type="text" className={classes.login} placeholder="username"/>
              <div className="invalid-feedback">
                {registerError && registerError.message.login}
              </div>
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input name="email" type="email" className={classes.email} placeholder="name@example.com"/>
              <div className="invalid-feedback">
                {registerError && registerError.message.email}
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" className={classes.password}/>
              <div className="invalid-feedback">
                {registerError && registerError.message.password}
              </div>
            </div>
            <div className="form-group">
              <label>Avatar</label>
              <input name="avatar" type="file" className="form-control-file"/>
            </div>
            <button type="submit" className="btn btn-primary">Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}