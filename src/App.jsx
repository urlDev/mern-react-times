import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./components/home/Home";
import LoginRegister from "./components/login-register/LoginRegister";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/profile/" component={LoginRegister} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
