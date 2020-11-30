import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchForex,
  setMarketDetail,
  fetchChartData,
} from '../../redux/actions/chart';

import { MarketCardsContainer, MarketCards } from './HomeMarketCards.styles';

const HomeMarketCards = () => {
  const { marketType, forex, chartTimeFrame } = useSelector(
    (chart) => chart.chart,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchForex(marketType));
  }, [dispatch, marketType]);

  return (
    <MarketCardsContainer array={forex}>
      {forex.map((data) => {
        return (
          <MarketCards
            to={`/${data.symbol.toLowerCase()}`}
            percentage={data.changesPercentage}
            onClick={() => {
              dispatch(setMarketDetail({ data }));
              dispatch(fetchChartData(data.symbol, chartTimeFrame));
            }}
          >
            <h1>{data.symbol}</h1>
            <h2>
              {data.price} - {data.changesPercentage}
            </h2>
            <h2>{moment(data.timestamp).format('h:mm A')}</h2>
          </MarketCards>
        );
      })}
    </MarketCardsContainer>
  );
};

export default HomeMarketCards;
