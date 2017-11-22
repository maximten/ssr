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
    }, (item, key) => {
      return classNames('form-control', { 'is-invalid': registerError && registerError.message[key] });
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2>Sign up</h2>
                <form onSubmit={register}>
                  <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" className={classes.email} placeholder="john@doe.com"/>
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
          </div>
        </div>
      </div>
    );
  }
}