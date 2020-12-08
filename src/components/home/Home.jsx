import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import LogoDarkSrc from '../../assets/logo.svg';

import Loading from '../loading/Loading';
import ErrorFallback from '../error-fallback/ErrorFallback';
import Nav from '../nav/Nav';
import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import StoryComponents from '../story-components/StoryComponents';
import MarketComponents from '../market-components/MarketComponents';
import MarketDetails from '../market-details/MarketDetails';

const Home = () => {
  const { header, loadingNews } = useSelector((news) => news.news);
  const { error } = useSelector((chart) => chart.chart);

  return (
    <div>
      <Nav logo={LogoDarkSrc} border={true} icon={true} />
      <StoryTopicHeaders />
      <Switch>
        {loadingNews ? (
          <Loading height />
        ) : (
          <Route
            path={`/${header.toLowerCase()}`}
            component={StoryComponents}
          />
        )}
        <Route path="/:symbol" component={MarketDetails} />
      </Switch>
      {error ? <ErrorFallback /> : <MarketComponents />}
    </div>
  );
};

export default Home;
