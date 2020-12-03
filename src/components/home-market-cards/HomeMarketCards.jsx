// import React from 'react';
// import moment from 'moment';
// import { useSelector, useDispatch } from 'react-redux';

// import {
//   setMarketDetail,
//   fetchChartData,
//   fetchRating,
//   fetchForex,
//   fetchHomeChart,
// } from '../../redux/actions/chart';

// import MarketCardsChart from '../market-cards-chart/MarketCardsChart';
// import {
//   MarketCardsContainer,
//   MarketCards,
//   Left,
//   Right,
// } from './HomeMarketCards.styles';

// const HomeMarketCards = () => {
//   const { forex, chartTimeFrame, marketType } = useSelector(
//     (chart) => chart.chart,
//   );
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     dispatch(fetchForex(marketType));
//     dispatch(fetchHomeChart(marketType));
//   }, [dispatch, marketType]);

//   return (
//     <MarketCardsContainer array={forex}>
//       {forex.map((data, index) => {
//         return (
//           <MarketCards
//             to={`/${data.symbol.toLowerCase()}`}
//             percentage={data.changesPercentage}
//             onClick={() => {
//               dispatch(setMarketDetail({ data }));
//               dispatch(fetchChartData(data.symbol, chartTimeFrame));
//               dispatch(fetchRating(data.symbol));
//             }}
//           >
//             <h1>{data.symbol.split('^').join('')}</h1>
//             <h2>
//               {data.price} - {data.changesPercentage}
//             </h2>
//             <h2>{moment(data.timestamp).format('h:mm A')}</h2>

//             {data && <MarketCardsChart index={index} />}
//           </MarketCards>
//         );
//       })}
//     </MarketCardsContainer>
//   );
// };

// export default HomeMarketCards;

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
import { MarketCardsContainer, MarketCards } from './HomeMarketCards.styles';

const HomeMarketCards = () => {
  const { marketType, forex, homeChartData } = useSelector(
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
              dispatch(fetchChartData(data.symbol));
              dispatch(fetchRating(data.symbol));
            }}
          >
            <div style={{ marginRight: '7px' }}>
              <h1>{data.symbol.split('^').join('')}</h1>
              <h2>
                {data.price} - {data.changesPercentage}
              </h2>
              <h2>{moment(data.timestamp).format('h:mm A')}</h2>
            </div>

            {homeChartData.length > 5 && <MarketCardsChart index={index} />}
          </MarketCards>
        );
      })}
    </MarketCardsContainer>
  );
};

export default HomeMarketCards;
