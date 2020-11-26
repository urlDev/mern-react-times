import TopStories from '../top-stories/TopStories';
import MostPopular from '../most-popular/MostPopular';

import { StoryComponentsContainer } from './StoryComponents.styles';

const Home = () => {
  return (
    <StoryComponentsContainer>
      <TopStories />
      <MostPopular />
    </StoryComponentsContainer>
  );
};

export default Home;
