import { useSelector } from 'react-redux';

import ErrorFallback from '../error-fallback/ErrorFallback';
import MarketComponents from '../market-components/MarketComponents';
import Nav from '../nav/Nav';
import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import LogoDarkSrc from '../../assets/logo.svg';
import UserImage from '../user-image/UserImage';
import { StoryTopicContainer } from '../story-topic/StoryTopic.styles.js';
import {
  TopStoriesContainer,
  StoryContainer,
  Tag,
  Title,
  SubTitle,
  TagContainer,
} from '../top-stories/TopStories.styles';

const UserDetails = () => {
  const { errorChart } = useSelector((chart) => chart.chart);
  return (
    <>
      <Nav logo={LogoDarkSrc} borderBottom="1px solid lightgray" icon="1" />
      <StoryTopicHeaders />
      <div style={{ margin: '0 30px' }}>
        <StoryTopicContainer>
          <h1 style={{ marginTop: '25px' }}>Profile</h1>
        </StoryTopicContainer>

        <TopStoriesContainer>
          <UserImage width="200px" />
        </TopStoriesContainer>
      </div>
      {errorChart ? <ErrorFallback /> : <MarketComponents />}
    </>
  );
};

export default UserDetails;
