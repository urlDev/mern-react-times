import { useSelector } from "react-redux";

import {
  MostPopularContainer,
  PopularTitle,
  PopularStoriesContainer,
  StoryContainer,
  StoryTitle,
  ImageContainer,
  SeeAll,
} from "./MostPopular.styles";

const MostPopular = () => {
  const { popular } = useSelector((news) => news.news);

  // Wanted to show random results on each refresh/load
  // but random makes the app loads more than once
  // const random = Math.floor(Math.random() * popular.length);

  return (
    <MostPopularContainer>
      <PopularTitle>Most Popular</PopularTitle>
      {popular.length > 0
        ? popular.slice(0, 3).map((story) => {
            return (
              <PopularStoriesContainer
                key={story.id}
                href={story.url}
                target="_blank"
              >
                <StoryContainer>
                  <StoryTitle font="var(--font-header)">
                    {story.title.split(" ").slice(0, 6).join(" ")}...
                  </StoryTitle>
                  <StoryTitle color="var(--gray)">
                    {story.abstract.split(" ").slice(0, 10).join(" ")}...
                  </StoryTitle>
                </StoryContainer>
                <ImageContainer
                // background={
                //   story
                //     ? story.media[0]["media-metadata"][2].url
                //     : null
                // }
                />
              </PopularStoriesContainer>
            );
          })
        : null}
      <SeeAll
        popular="43px"
        href="https://www.nytimes.com/trending/?action=click&contentCollection=Africa&module=MostEmailed&pgtype=article&region=Marginalia&src=me&version=Full"
        target="_blank"
      >
        See All
      </SeeAll>
    </MostPopularContainer>
  );
};

export default MostPopular;
