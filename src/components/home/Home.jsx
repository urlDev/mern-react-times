import TopStories from '../top-stories/TopStories';
import MostPopular from '../most-popular/MostPopular';

import { HomeContainer } from './Home.styles';

const Home = () => {
  return (
    <HomeContainer>
      <TopStories />
      <MostPopular />
    </HomeContainer>
  );
};

export default Home;
