import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

import Login from './Pages/Authpages/Login';
import Register from './Pages/Authpages/Register';
import Home from './Pages/Home'
import Search from './Pages/Search';




function App() {
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
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Search">
            <Search />
          </Route>

        </Switch>



      </div>
    </Router>
  );
}

export default App;
