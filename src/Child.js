import React, { Component } from 'react';

class Child extends Component {
  state = {
    renderCount: 0
  }

  /*
    Checks if new props are same (=== equality check) as previous props,
    only re-renders component if new
  */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.clicked !== this.props.clicked;
  }

  /*
    Updates render count when props change and force re-render
  */
  static getDerivedStateFromProps(props, state) {
    return { renderCount: state.renderCount + 1 };
  }

  render() {
    return (
      <div className='child'>
        <button onClick={this.props.clicked}>
          <strong>Button Render Count: {this.state.renderCount}</strong>
        </button>

        {this.props.children}
      </div>
    );
  }
}

export default Child;

/*
  Re-renders are expensive:
    takes away resources from other processes
    poor UX because elements are not interactable during reloads

  Uses excess memory
    New object (function) is created each time and added to the heap

*/