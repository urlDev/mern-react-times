import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setMarketDetail,
  fetchChartData,
  fetchRating,
  fetchHomeChart,
  fetchForex,
} from '../../redux/actions/chart';

import MarketCardsChart from '../market-cards-chart/MarketCardsChart';
import { MarketCardsContainer, MarketCards } from './HomeMarketCards.styles';

const HomeMarketCards = () => {
  const { forex, homeChartData, chartTimeFrame, marketType } = useSelector(
    (chart) => chart.chart,
  );
  const dispatch = useDispatch();

  return (
    <MarketCardsContainer>
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
            key={data.symbol}
          >
            <div>
              <h1>{data.symbol.split('^').join('')}</h1>
              <h1
                style={{
                  fontWeight: 'normal',
                  fontSize: 'var(--size-sub-menu)',
                }}
              >
                $ {data.price.toFixed(2)}
              </h1>
              <h2> {data.changesPercentage}%</h2>
            </div>

            {homeChartData.length > 5 && <MarketCardsChart index={index} />}
          </MarketCards>
        );
      })}
    </MarketCardsContainer>
  );
};

export default HomeMarketCards;
