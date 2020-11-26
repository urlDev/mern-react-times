import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import StoryTopic from '../story-topic/StoryTopic';

import {
  TopStoriesContainer,
  StoryContainer,
  Tag,
  Title,
  SubTitle,
  StoryLink,
  TagContainer,
} from './TopStories.styles';

import { Date } from '../story-topic-headers/StoryTopicHeaders.styles';

const TopStories = () => {
  const { loading, story } = useSelector((news) => news.news);

  // const random = Math.floor(Math.random() * story.length);

  return (
    <div>
      <StoryTopic />
      <TopStoriesContainer>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          story.slice(0, 3).map((data) => {
            return (
              <StoryContainer>
                <img src={data.multimedia[3].url} alt="story" />
                <TagContainer>
                  <h1>
                    <Tag>{data.section}</Tag>
                  </h1>
                  <Date top>
                    {moment(data.created_date).format('MMM DD, YYYY')}
                  </Date>
                </TagContainer>

                <Title>{data.title}</Title>
                <SubTitle>{data.abstract}</SubTitle>
                <StoryLink top>Continue Reading</StoryLink>
              </StoryContainer>
            );
          })
        )}
      </TopStoriesContainer>
    </div>
  );
};

export default TopStories;
