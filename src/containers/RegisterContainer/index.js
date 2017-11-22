import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { register } from '../../redux/actions/user';
import RegisterForm from '../../components/RegisterForm';

class RegisterContainer extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Sign up</title>
        </Helmet>
        <RegisterForm {...this.props} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
