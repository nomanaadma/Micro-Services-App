import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fac from './Fac';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <ul className="App-title">
              <li><img src={logo} className="App-logo" alt="logo" /></li>
              <li><h1 className="App-title">Welcome to React</h1></li>
            </ul>
            <ul className="App-navigation">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/otherpage">Other Page</Link></li>
            </ul>
          </header>
          <div>
            <Route exact path="/" component={Fac} />
            <Route path="/otherpage" component={OtherPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
