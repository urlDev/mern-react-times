import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import {
  fetchTopStories,
  fetchMostPopular,
  changeHeader,
} from "../../redux/actions/news";

import Loading from "../loading/Loading";
import ErrorFallback from "../error-fallback/ErrorFallback";
import StoryComponents from "../story-components/StoryComponents";
import MarketComponents from "../market-components/MarketComponents";
import MarketDetails from "../market-details/MarketDetails";

import { topics } from "../../components/story-topic-headers/StoryTopicHeaders";
import ResponsiveNav from "../responsive-nav/ResponsiveNav";

const Home = () => {
  const { header, loadingNews, popular, width } = useSelector(
    (news) => news.news
  );
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

    dispatch(fetchTopStories(header));

    if (popular.length === 0) {
      dispatch(fetchMostPopular());
    }
  }, [dispatch, path, popular.length, header]);

  return (
    <>
      <ResponsiveNav />
      <Switch>
        {loadingNews ? (
          <Loading height={width < 1024 ? "600px" : "400px"} />
        ) : (
          <Route
            path={`/${header.toLowerCase()}`}
            render={() => <StoryComponents />}
          />
        )}
        <Route path="/details/:symbol" render={() => <MarketDetails />} />
      </Switch>
      {errorChart ? <ErrorFallback /> : <MarketComponents />}
    </>
  );
};

export default Home;
