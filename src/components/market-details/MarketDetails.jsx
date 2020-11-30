import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setChartTimeFrame, fetchChartData } from '../../redux/actions/chart';

import Chart from '../chart/Chart';
import {
  StoryTopicContainer,
  TimeFrame,
} from '../story-topic/StoryTopic.styles';

const MarketDetails = () => {
  const { marketDetail, chartTimeFrame } = useSelector((chart) => chart.chart);
  const dispatch = useDispatch();
  const timeFrames = ['5min', '15min', '30min', '1hour'];

  React.useEffect(() => {
    console.log(chartTimeFrame);
    dispatch(fetchChartData(marketDetail.symbol, chartTimeFrame));
  }, [dispatch, chartTimeFrame, marketDetail.symbol]);

  return (
    <div style={{ margin: '0 30px' }}>
      <StoryTopicContainer>
        <h1>{marketDetail.name}</h1>
        {timeFrames.map((time, i) => (
          <TimeFrame
            key={time}
            // active={chartTimeFrame === time}
            onClick={() => {
              dispatch(setChartTimeFrame(time));
            }}
          >
            {time}
          </TimeFrame>
        ))}
      </StoryTopicContainer>
      <Chart />
    </div>
  );
};

export default MarketDetails;
