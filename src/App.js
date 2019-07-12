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

/*
  Anonymous functions inside render call:

  render() {
    // these two are equivalent
    <SomeComponent clicked={this.clickHandler.bind(this)}></SomeComponent>
    <SomeComponent clicked={() => this.clickHandler}></SomeComponent>

    // for passing a arguement
    <SomeComponent clicked={() => this.clickHandler(someArgument)}></SomeComponent>
  }

*/