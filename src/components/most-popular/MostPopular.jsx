import { useSelector } from 'react-redux';

import {
  MostPopularContainer,
  PopularTitle,
  PopularStoriesContainer,
  StoryContainer,
  StoryTitle,
  ImageContainer,
} from './MostPopular.styles';

import { StoryLink } from '../top-stories/TopStories.styles';

const MostPopular = () => {
  const { popular } = useSelector((news) => news.news);

  // Wanted to show random results on each refresh/load
  // but random makes the app loads more than once
  // const random = Math.floor(Math.random() * popular.length);

  return (
    <MostPopularContainer>
      <PopularTitle>Most Popular</PopularTitle>
      {popular.slice(0, 3).map((story) => {
        return (
          <PopularStoriesContainer>
            <StoryContainer>
              <StoryTitle font>{story.title}</StoryTitle>
              <StoryTitle color>
                {story.abstract.split(' ').slice(0, 10).join(' ')}...
              </StoryTitle>
            </StoryContainer>
            <ImageContainer
              background={story.media[0]['media-metadata'][2].url}
            />
          </PopularStoriesContainer>
        );
      })}{' '}
      <StoryLink popular>See All</StoryLink>
    </MostPopularContainer>
  );
};

export default MostPopular;
