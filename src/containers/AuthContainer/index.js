import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Auth from '../../components/Auth';
import { register, login } from '../../redux/actions/user';

class AuthContainer extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Sign in</title>
        </Helmet>
        <Auth {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  register: (formData) => {
    dispatch(register(formData));
  },
  login: (formData) => {
    dispatch(login(formData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
