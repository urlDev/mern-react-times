import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import LogoDarkSrc from '../../assets/logo.svg';

import Nav from '../nav/Nav';
import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import StoryComponents from '../story-components/StoryComponents';
import MarketComponents from '../market-components/MarketComponents';

const Home = () => {
  const { header } = useSelector((news) => news.news);

  return (
    <div>
      <Nav logo={LogoDarkSrc} border={true} icon={true} color={false} />
      <StoryTopicHeaders />
      <Route path={`/${header.toLowerCase()}`} component={StoryComponents} />
      <MarketComponents />
    </div>
  );
};

export default Home;
