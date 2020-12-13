import React from 'react';
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
  const { errorChart } = useSelector((chart) => chart.chart);

  return (
    <div>
      <Nav logo={LogoDarkSrc} borderBottom="1px solid lightgray" icon="1" />
      <StoryTopicHeaders />
      <Switch>
        {loadingNews ? (
          <Loading height="400px" />
        ) : (
          <Route
            path={`/${header.toLowerCase()}`}
            render={() => <StoryComponents />}
          />
        )}
        <Route path="/details/:symbol" render={() => <MarketDetails />} />
      </Switch>
      {errorChart ? <ErrorFallback /> : <MarketComponents />}
    </div>
  );
};

export default Home;
