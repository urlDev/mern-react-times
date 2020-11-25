import moment from 'moment';
import { useSelector } from 'react-redux';

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

  const random = Math.floor(Math.random() * story.length);

  return (
    <TopStoriesContainer>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        story &&
        story.slice(random - 3, random).map((data) => {
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
  );
};

export default TopStories;
