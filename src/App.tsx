import React, { Component } from 'react';
import Header from './components/webcomps/Header'
import Authorization from './components/webcomps/Authorization';




class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Authorization />
        </div>
      );
    }
  }
  
  export default App;