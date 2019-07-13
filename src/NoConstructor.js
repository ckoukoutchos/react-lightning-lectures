import React, { Component } from 'react';

class NoConstructor extends Component {
  // initialize component state
  state = {
    counter: 0
  }

  // on button click, increase counter number
  clickHandler = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  }

  render() {
    return (
      <div className='Box'>
        <h1>No Constructor Call</h1>
        <h3># of Clicks: {this.state.counter}</h3>
        <button onClick={this.clickHandler}>Click Me!</button>
      </div>
    );
  }
}

export default NoConstructor;