import React, { Component } from 'react'

class Constructor extends Component {
  // constructor function
  constructor(props) {
    // call constructor of super class `Component` and pass in props
    super(props);

    // initialize component state
    this.state = {
      counter: 0
    }

    // bind handler to this component object
    this.clickHandler = this.clickHandler.bind(this);
  }

  // on button click, increase counter number
  clickHandler() {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  }

  render() {
    return (
      <div className='Box'>
        <h1>With Constructor Call</h1>
        <h3># of Clicks: {this.state.counter}</h3>
        <button onClick={this.clickHandler}>Click Me!</button>
      </div>
    );
  }
}

export default Constructor;