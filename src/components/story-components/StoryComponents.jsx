import { useSelector } from 'react-redux';

import TopStories from '../top-stories/TopStories';
import MostPopular from '../most-popular/MostPopular';

import { StoryComponentsContainer } from './StoryComponents.styles';

const Home = () => {
  const { loading } = useSelector((news) => news.news);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <StoryComponentsContainer>
          <TopStories />
          <MostPopular />
        </StoryComponentsContainer>
      )}
    </>
  );
};

export default Home;
