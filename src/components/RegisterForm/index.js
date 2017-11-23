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
      email: '', password: '',
    }, (item, key) => classNames('form-control', { 'is-invalid': registerError && registerError.message[key] }));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                {
                  !user ?
                  <div>
                    <h2>Sign up</h2>
                    <form onSubmit={register}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" className={classes.email} placeholder="john@doe.com" />
                        <div className="invalid-feedback">
                          {registerError && registerError.message.email}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" className={classes.password} />
                        <div className="invalid-feedback">
                          {registerError && registerError.message.password}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="avatar">Avatar</label>
                        <input id="avatar" name="avatar" type="file" className="form-control-file" />
                      </div>
                      <button type="submit" className="btn btn-primary">Sign up</button>
                    </form>
                  </div>
                  :
                  <h2 className="text-success text-center">You're logged in!</h2>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
