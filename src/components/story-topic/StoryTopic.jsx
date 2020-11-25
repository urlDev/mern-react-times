import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTopStories } from '../../redux/actions/news';

import { StoryTopicContainer } from './StoryTopic.styles';

const StoryTopic = () => {
  const { header } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTopStories(header));
  }, [dispatch]);

  return (
    <StoryTopicContainer>
      <h1>{header}</h1>
    </StoryTopicContainer>
  );
};

export default StoryTopic;
