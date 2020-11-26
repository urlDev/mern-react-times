import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTopStories } from './redux/actions/news';

import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import StoryTopicHeaders from './components/story-topic-headers/StoryTopicHeaders';

import './App.css';

const App = () => {
  const { header } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTopStories(header));
  }, [dispatch, header]);

  return (
    <div className="App">
      <Nav />
      <StoryTopicHeaders />
      <Switch>
        <Route path={`/${header.toLowerCase()}`} component={Home} />
      </Switch>
    </div>
  );
};

export default App;
