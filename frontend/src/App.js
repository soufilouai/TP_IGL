import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Resultats from './Pages/Results';
import Login from './Pages/Authpages/Login';
import Register from './Pages/Authpages/Register';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Library from './Pages/Library';
import ResultatsAd from './Pages/Resultsadmin';
import ResultatsMod from './Pages/Resultatsmod';
import Articlemodif from './Pages/Articlemodif';
import SearchAdmin from './Pages/SearchAdmin';


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
          <Route exact path="/Resultats/" component={Resultats} />
          <Route exact path="/library/" component={Library} />
          <Route exact path="/Resultatsmod/" component={ResultatsMod} />
          <Route exact path="/Resultatsadmin/" component={ResultatsAd} />
          <Route exact path="/SearchAdmin/" component={SearchAdmin} />
          {/* par defaut : home  */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Article" component= {Articlemodif}>       
          </Route>
          <Route path="/Resultats/Articlemodif/:id" component={Articlemodif} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


