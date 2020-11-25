import StoryTopicHeaders from '../story-topic-headers/StoryTopicHeaders';
import StoryTopic from '../story-topic/StoryTopic';
import TopStories from '../top-stories/TopStories';

import { HomeContainer } from './Home.styles';

const Home = () => {
  return (
    <HomeContainer>
      <StoryTopicHeaders />
      <StoryTopic />
      <TopStories />
    </HomeContainer>
  );
};

export default Home;
