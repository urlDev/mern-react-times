import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import LogoDarkSrc from '../../assets/logo.svg';

import Nav from '../nav/Nav';
import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import StoryComponents from '../story-components/StoryComponents';
import MarketComponents from '../market-components/MarketComponents';
import MarketDetails from '../market-details/MarketDetails';

const Home = () => {
  const { header } = useSelector((news) => news.news);
  const { loading } = useSelector((chart) => chart.chart);
  return (
    <div>
      <Nav logo={LogoDarkSrc} border={true} icon={true} color={false} />
      <StoryTopicHeaders />
      <Switch>
        <Route path={`/${header.toLowerCase()}`} component={StoryComponents} />
        <Route path="/:symbol" component={MarketDetails} />
      </Switch>
      <MarketComponents />
    </div>
  );
};

export default Home;
