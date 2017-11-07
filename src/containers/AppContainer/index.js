import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import App from '../../components/App';

class AppContainer extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return <App {...this.props}/>;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
