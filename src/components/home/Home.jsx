import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import {
  fetchTopStories,
  fetchMostPopular,
  changeHeader,
} from "../../redux/actions/news";

import LogoDarkSrc from "../../assets/logo.svg";

import Loading from "../loading/Loading";
import ErrorFallback from "../error-fallback/ErrorFallback";
import Nav from "../nav/Nav";
import StoryTopicHeaders from "../story-topic-headers/StoryTopicHeaders";
import StoryComponents from "../story-components/StoryComponents";
import MarketComponents from "../market-components/MarketComponents";
import MarketDetails from "../market-details/MarketDetails";

import { topics } from "../../components/story-topic-headers/StoryTopicHeaders";

const Home = () => {
  const { header, loadingNews, popular } = useSelector((news) => news.news);
  const { errorChart } = useSelector((chart) => chart.chart);

  const dispatch = useDispatch();
  const path = window.location.pathname;

  React.useEffect(() => {
    // If client jumps to some route (any of those topics) without clicking to menu bar
    // then the app will show the client the relevant results
    if (
      topics.includes(path.slice(1).charAt(0).toUpperCase() + path.slice(2)) ||
      path === "/"
    ) {
      dispatch(changeHeader(path.slice(1)));
    }
    // } else if (path.split('/').includes('details')) {
    //   dispatch(fetchForex(path.slice(9).toUpperCase()));
    //   dispatch(fetchChartData(path.slice(9).toUpperCase(), '1hour'));
    //   dispatch(fetchRating(path.slice(9).toUpperCase()));
    // } else {
    //   dispatch(fetchNewsError({ Error: 'Unable to find the page' }));
    // }

    dispatch(fetchTopStories(header));

    if (popular.length === 0) {
      dispatch(fetchMostPopular());
    }
  }, [dispatch, path, popular, header]);

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
