import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "utils/react-redux-hooks";

import { setWidth } from "./redux/actions/news";

import Home from "./components/home/Home";
import LoginRegister from "./components/login-register/LoginRegister";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(setWidth(window.innerWidth));
    });

    return () => {
      window.removeEventListener("resize", () => {
        dispatch(setWidth(window.innerWidth));
      });
    };
  }, [dispatch]);

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
