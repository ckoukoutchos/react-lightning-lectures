import React, { Component } from 'react';
import './App.css';
import Parent from './Parent';

class App extends Component {
  state = {
    renderCount: 1
  }

  /*
    Updates state every 5 seconds to trigger a re-render
  */
  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => ({ renderCount: prevState.renderCount + 1 }));
    }, 5000);
  }

  render() {
    return (
      <Parent>
        <h3>Parent Render Count: {this.state.renderCount}</h3>
      </Parent>
    );
  }
}

export default App;
