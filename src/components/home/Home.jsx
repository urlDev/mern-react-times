import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import LogoDarkSrc from '../../assets/logo.svg';

import Nav from '../nav/Nav';
import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import StoryComponents from '../story-components/StoryComponents';

const Home = () => {
  const { header } = useSelector((news) => news.news);

  return (
    <div>
      <Nav logo={LogoDarkSrc} border icon={true} color={false} />
      <StoryTopicHeaders />
      <Route path={`/${header.toLowerCase()}`} component={StoryComponents} />
    </div>
  );
};

export default Home;
