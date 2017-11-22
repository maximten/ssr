import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { login } from '../../redux/actions/user';
import LoginForm from '../../components/LoginForm';

class LoginContainer extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Sign in</title>
        </Helmet>
        <LoginForm {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  login: (formData) => {
    dispatch(login(formData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
