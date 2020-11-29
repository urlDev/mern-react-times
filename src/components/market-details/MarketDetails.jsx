import { useSelector } from 'react-redux';

import Chart from '../chart/Chart';
import { StoryTopicContainer } from '../story-topic/StoryTopic.styles';

const MarketDetails = () => {
  const { marketDetail } = useSelector((chart) => chart.chart);
  return (
    <div style={{ margin: '0 30px' }}>
      <StoryTopicContainer>
        <h1>{marketDetail.name}</h1>
      </StoryTopicContainer>
      <Chart />
    </div>
  );
};

export default MarketDetails;
