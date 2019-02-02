import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Users from './users/Users';
import Login from './auth/Login';
import signup from './signup/Signup'
import './App.css';

const Home = props => {
  return(
    <div>
      <h1>
        Home Component
      </h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
          <NavLink to="/" exact>
          Home
          </NavLink>
          &nbsp; |&nbsp;
          <NavLink to="/users">
          Users
          </NavLink>
          &nbsp; |&nbsp;
          <NavLink to="/Login">
          Login
          </NavLink>
          &nbsp; |&nbsp;
          <NavLink to="/Signup">
          Signup
          </NavLink>
          &nbsp; |&nbsp;
          <button onClick={this.signout}>Signout</button>
          </nav>
          <main>
            <Route path="/" component={Home} exact/>
            <Route path= "/users" component ={Users}></Route>
            <Route path= "/Login" component ={Login}></Route>
            <Route path= "/Signup" component ={signup}></Route>
          </main>
        </header>
      </div>
    );
  }
  signout = () => {
    localStorage.removeItem('jwt');
  }
}

export default App;
