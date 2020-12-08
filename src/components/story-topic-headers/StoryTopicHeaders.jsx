import moment from 'moment';
import { useDispatch } from 'react-redux';

import { changeHeader } from '../../redux/actions/news';

import {
  StoryTopicHeadersContainer,
  TopicContainer,
  Date,
  StyledLink,
} from './StoryTopicHeaders.styles';

const StoryTopics = () => {
  const dispatch = useDispatch();

  const topics = [
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
