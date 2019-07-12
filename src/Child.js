import React, { Component } from 'react';

class Child extends Component {
  /*
    Checks if new props are same (=== equality check) as previous props,
    only re-renders component if new
  */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.clicked !== this.props.clicked;
  }

  render() {
    return (
      <div className='child'>
        <button onClick={this.props.clicked}>
          <strong>Click Me!</strong>
        </button>

        {this.props.children}
      </div>
    );
  }
}

export default Child;
