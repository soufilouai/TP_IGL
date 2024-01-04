import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Pages/Authpages/Login';
import Register from './Pages/Authpages/Register';
import Home from './Pages/Home';
import Search from './Pages/Search';

function App() {
  // check if the user exists to switch to search page 
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route
            exact
            path="/Search"
            render={(props) =>
              isAuthenticated ? <Search {...props} /> : <Redirect to="/Home" />
            }
          />
          {/* par defaut : home  */}
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


