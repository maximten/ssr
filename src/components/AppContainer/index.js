import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <title>App</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
        </Helmet>
        { this.props.children }
      </div>
    );
  }
}