import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCounter } from '../../redux/actions/counter';

class Counter extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const { counter: { counter }, setCounter } = this.props; 
    return (
      <div>
        { counter }
        <button onClick={ setCounter.bind(this, counter + 1) }>+</button>
        <button onClick={ setCounter.bind(this, counter - 1) }>-</button>
      </div>
    );
  }
}

Counter.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = dispatch => ({
  setCounter: (counter) => {
    dispatch(setCounter(counter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);