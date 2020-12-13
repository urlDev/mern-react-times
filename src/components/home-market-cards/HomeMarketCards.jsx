import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setMarketDetail,
  fetchChartData,
  fetchRating,
} from '../../redux/actions/chart';

import MarketCardsChart from '../market-cards-chart/MarketCardsChart';
import { MarketCardsContainer, MarketCards } from './HomeMarketCards.styles';

const HomeMarketCards = () => {
  const { forex, homeChartData, chartTimeFrame } = useSelector(
    (chart) => chart.chart,
  );
  const dispatch = useDispatch();

  return (
    <MarketCardsContainer>
      {forex.map((data, index) => {
        return (
          <MarketCards
            to={`/details/${data.symbol.toLowerCase()}`}
            percentage={data.changesPercentage}
            onClick={() => {
              dispatch(setMarketDetail({ data }));
              // dispatch(fetchChartData(data.symbol, chartTimeFrame));
              console.log(chartTimeFrame);
              dispatch(fetchRating(data.symbol));
            }}
            key={index}
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

            {homeChartData.length > 5 && (
              <MarketCardsChart chart={homeChartData[index]} />
            )}
          </MarketCards>
        );
      })}
    </MarketCardsContainer>
  );
};

export default HomeMarketCards;
