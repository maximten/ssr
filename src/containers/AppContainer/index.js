import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import App from '../../components/App';
import { logout } from '../../redux/actions/user';

class AppContainer extends Component {
  render() {
    return <App {...this.props} />;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
