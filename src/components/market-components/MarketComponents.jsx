import React from "react";
import { useDispatch, useSelector } from "utils/react-redux-hooks";
import { ErrorBoundary } from "react-error-boundary";

import { fetchHomeChart, fetchForex } from "redux/actions/chart";
import fetchMarketTypes from "utils/fetch-market-types";

import ErrorFallback from "components/error-fallback/ErrorFallback";
import Loading from "components/loading/Loading";
import HomeMarketCards from "components/home-market-cards/HomeMarketCards";

import {
  MarketComponentsContainer,
  MarketHeaderContainer,
  MarketTitle,
  MarketMenu,
} from "./MarketComponents.styles";

// First, I made market types array, the ones that I want to show in home page
export const marketTypes = [
  "Indexes",
  "Crypto",
  "Forex",
  "Stocks",
  "Commodities",
];

const MarketComponents = () => {
  const { loadingChart, marketType, marketName } = useSelector(
    (state) => state.chart
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (marketType) {
      dispatch(fetchForex(marketType));
      dispatch(fetchHomeChart(marketType));
    }
  }, [dispatch, marketType]);

  return (
    <MarketComponentsContainer>
      <MarketHeaderContainer>
        <MarketTitle>Market Snapshot</MarketTitle>
        {marketTypes.map((market, index) => (
          <MarketMenu
            key={index}
            active={market === marketName}
            type="button"
            onClick={() => {
              fetchMarketTypes(dispatch, market);
            }}
          >
            {market}
          </MarketMenu>
        ))}
      </MarketHeaderContainer>
      {loadingChart ? (
        <Loading />
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HomeMarketCards />
        </ErrorBoundary>
      )}
    </MarketComponentsContainer>
  );
};

export default MarketComponents;
