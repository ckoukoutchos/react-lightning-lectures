import React, { Component } from 'react';
import Child from './Child';

class Parent extends Component {
  state = {
    renderCount: 0
  }

  /*
    Updates render count when props change and force re-render
  */
  static getDerivedStateFromProps(props, state) {
    return { renderCount: state.renderCount + 1 };
  }

  /*
    Non-bound class method
  */
  clickHandler() {
    console.log('clicked');
  }

  /*
    Bound class method (using arrow function)
  */
  boundClickHandler = () => {
    console.log('clicked');
  }

  boundClickHandlerWithParam = (argument) => () => {
    console.log('Passd argument', argument);
  }

  render() {
    return (
      <div className='parent'>
        {/* UNbound */}
        <Child clicked={() => this.clickHandler}>
          <h3>Child Render Count: {this.state.renderCount}</h3>
        </Child>

        {/* bound */}
        {/* <Child clicked={this.boundClickHandler}>
          <h3>Child Render Count: {this.state.renderCount}</h3>
        </Child> */}

        {/* bound w/ argument */}
        {/* <Child clicked={this.boundClickHandlerWithParam('Works!')}>
          <h3>Child Render Count: {this.state.renderCount}</h3>
        </Child> */}

        {this.props.children}
      </div>
    )
  }
}

export default Parent;