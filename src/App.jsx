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
import Login from './components/login/Login';

import './App.css';

const App = () => {
  const { header } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  const path = window.location.pathname;

  React.useEffect(() => {
    // If client jumps to some route without clicking to menu bar
    // then the app will show the client the relevant results
    if (path.slice(1) !== 'home') {
      dispatch(changeHeader(path.slice(1)));
    }
    dispatch(fetchTopStories(header));
    dispatch(fetchMostPopular());
  }, [dispatch, header, path]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
