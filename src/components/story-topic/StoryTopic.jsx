import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTopStories } from '../../redux/actions/news';

import { StoryTopicContainer } from './StoryTopic.styles';

const StoryTopic = () => {
  const { header } = useSelector((news) => news.news);

  return (
    <StoryTopicContainer>
      <h1>{header.charAt(0).toUpperCase() + header.slice(1)}</h1>
    </StoryTopicContainer>
  );
};

export default StoryTopic;
