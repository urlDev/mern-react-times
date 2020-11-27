import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchTopStories,
  fetchMostPopular,
  changeHeader,
  cleanState,
} from './redux/actions/news';

import Home from './components/home/Home';
import LoginRegister from './components/login-register/LoginRegister';

import './App.css';

const App = () => {
  const { header } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  const path = window.location.pathname;

  React.useEffect(() => {
    // If client jumps to some route without clicking to menu bar
    // then the app will show the client the relevant results
    if (path !== '/') {
      dispatch(changeHeader(path.slice(1)));
    } else {
      dispatch(changeHeader('home'));
    }
    dispatch(fetchTopStories(header));
    dispatch(fetchMostPopular());
  }, [dispatch, header, path]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/profile" component={LoginRegister} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
