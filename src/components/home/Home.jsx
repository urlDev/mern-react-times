import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Nav from '../nav/Nav';
import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import StoryComponents from '../story-components/StoryComponents';

const Home = () => {
  const { header } = useSelector((news) => news.news);

  return (
    <div>
      <Nav />
      <StoryTopicHeaders />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path={`/${header.toLowerCase()}`} component={StoryComponents} />
    </div> //
  );
};

export default Home;
