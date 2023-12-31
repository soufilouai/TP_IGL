import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

import Login from './Pages/Authpages/Login';
import Register from './Pages/Authpages/Register';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/Login">
          <Login/>
        </Route>
        <Route exact path="/Register">
          <Register/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
