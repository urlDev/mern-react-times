import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchTopStories,
  fetchMostPopular,
  changeHeader,
} from './redux/actions/news';

import Home from './components/home/Home';
import LoginRegister from './components/login-register/LoginRegister';

import './App.css';

const App = () => {
  const { header, popular } = useSelector((news) => news.news);
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

    if (popular.length === 0) {
      dispatch(fetchMostPopular());
    }
  }, [dispatch, header, path, popular]);

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
