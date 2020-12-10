import moment from 'moment';
import { useDispatch } from 'react-redux';

import { changeHeader, clearError } from '../../redux/actions/news';

import {
  StoryTopicHeadersContainer,
  TopicContainer,
  Date,
  StyledLink,
} from './StoryTopicHeaders.styles';

export const topics = [
  'Home',
  'Arts',
  'Business',
  'Health',
  'Opinion',
  'Politics',
  'Science',
  'Sports',
  'Technology',
  'Travel',
];

const StoryTopics = () => {
  const dispatch = useDispatch();

  return (
    <StoryTopicHeadersContainer>
      <Date>
        <span>{moment().format('dddd | ')}</span>
        {moment().format('MMM DD, YYYY')}
      </Date>
      <TopicContainer>
        {topics.map((topic) => {
          return (
            <StyledLink key={topic} to={`/${topic.toLowerCase()}`}>
              <span
                onClick={() => {
                  dispatch(changeHeader(topic.toLowerCase()));
                  dispatch(clearError());
                }}
              >
                {topic}
              </span>
            </StyledLink>
          );
        })}
      </TopicContainer>
    </StoryTopicHeadersContainer>
  );
};

export default StoryTopics;
