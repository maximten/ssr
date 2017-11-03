import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        App
        <br/>
        <button onClick={() => { console.log('Bye world') }}>
          Hello
        </button>
      </div>
    );
  }
}
