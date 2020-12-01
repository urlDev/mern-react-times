import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setChartTimeFrame,
  fetchChartData,
  fetchRating,
} from '../../redux/actions/chart';

import DetailsTable from '../details-table/DetailsTable';
import Chart from '../chart/Chart';
import {
  StoryTopicContainer,
  TimeFrame,
} from '../story-topic/StoryTopic.styles';

const MarketDetails = () => {
  const { marketDetail, chartTimeFrame, rating } = useSelector(
    (chart) => chart.chart,
  );
  const dispatch = useDispatch();
  const timeFrames = ['5min', '15min', '30min', '1hour'];

  React.useEffect(() => {
    dispatch(fetchChartData(marketDetail.symbol, chartTimeFrame));
  }, [dispatch, chartTimeFrame, marketDetail.symbol]);

  return (
    <div style={{ margin: '0 30px' }}>
      <StoryTopicContainer>
        <h1>{marketDetail.name}</h1>
        {timeFrames.map((time, i) => (
          <TimeFrame
            key={time}
            active={chartTimeFrame === time}
            onClick={() => {
              dispatch(setChartTimeFrame(time));
            }}
          >
            {time}
          </TimeFrame>
        ))}
      </StoryTopicContainer>
      <div style={{ display: 'flex' }}>
        <Chart />
        <DetailsTable />
      </div>
    </div>
  );
};

export default MarketDetails;
