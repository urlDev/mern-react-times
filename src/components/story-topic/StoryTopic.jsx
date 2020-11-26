import React from 'react';
import { useSelector } from 'react-redux';

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
