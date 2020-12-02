import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchForex,
  setMarketDetail,
  fetchChartData,
  fetchRating,
  fetchHomeChart,
} from '../../redux/actions/chart';

import MarketCardsChart from '../market-cards-chart/MarketCardsChart';
import {
  MarketCardsContainer,
  MarketCards,
  Left,
  Right,
} from './HomeMarketCards.styles';

const HomeMarketCards = () => {
  const { marketType, forex, chartTimeFrame } = useSelector(
    (chart) => chart.chart,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchForex(marketType));
    dispatch(fetchHomeChart(marketType));
  }, [dispatch, marketType]);

  return (
    <MarketCardsContainer array={forex}>
      {forex.map((data, index) => {
        return (
          <MarketCards
            to={`/${data.symbol.toLowerCase()}`}
            percentage={data.changesPercentage}
            onClick={() => {
              dispatch(setMarketDetail({ data }));
              dispatch(fetchChartData(data.symbol, chartTimeFrame));
              dispatch(fetchRating(data.symbol));
            }}
          >
            <Left>
              <h1>{data.symbol.split('^').join('')}</h1>
              <h2>
                {data.price} - {data.changesPercentage}
              </h2>
              <h2>{moment(data.timestamp).format('h:mm A')}</h2>
            </Left>
            <Right>
              <MarketCardsChart index={index} />
            </Right>
          </MarketCards>
        );
      })}
    </MarketCardsContainer>
  );
};

export default HomeMarketCards;
