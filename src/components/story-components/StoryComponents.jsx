import React from 'react';
import { useSelector } from 'react-redux';

import ErrorFallback from '../error-fallback/ErrorFallback';
import TopStories from '../top-stories/TopStories';
import MostPopular from '../most-popular/MostPopular';

import { StoryComponentsContainer } from './StoryComponents.styles';

const Home = () => {
  const { errorNews } = useSelector((news) => news.news);

  console.log(errorNews);

  return (
    <>
      <StoryComponentsContainer>
        <TopStories />
        <MostPopular />
      </StoryComponentsContainer>
    </>
  );
};

export default Home;
