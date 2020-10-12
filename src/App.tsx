import React, { Component } from 'react';
import Authorization from './components/webcomps/Authorization';
import Header from './components/webcomps/Header';
import Footer from './components/webcomps/Footer';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Authorization />
          <Footer />
        </div>
      );
    }
  }
  
  export default App;