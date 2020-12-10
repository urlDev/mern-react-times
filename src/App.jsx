import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchTopStories,
  fetchMostPopular,
  changeHeader,
  fetchNewsError,
} from './redux/actions/news';

import { topics } from './components/story-topic-headers/StoryTopicHeaders';
import Home from './components/home/Home';
import LoginRegister from './components/login-register/LoginRegister';

import './App.css';

const App = () => {
  const { header, popular } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  const path = window.location.pathname;

  React.useEffect(() => {
    // If client jumps to some route (any of those topics) without clicking to menu bar
    // then the app will show the client the relevant results
    // if (
    //   topics.includes(path.slice(1).charAt(0).toUpperCase() + path.slice(2)) ||
    //   path === '/'
    // ) {
    //   dispatch(changeHeader(path.slice(1)));
    // } else {
    //   dispatch(
    //     fetchNewsError({
    //       Error: 'Unable to open desired page. Please make a search',
    //     }),
    //   );
    // }

    dispatch(fetchTopStories(header));

    if (popular.length === 0) {
      dispatch(fetchMostPopular());
    }
  }, [dispatch, header, popular]);

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
