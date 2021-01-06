import React from "react";
import { useSelector } from "../../utils/react-redux-hooks";

import NewsPlaceholder from "../../assets/newsPlaceholder.png";

import {
  MostPopularContainer,
  PopularTitle,
  PopularStoriesContainer,
  StoryContainer,
  StoryTitle,
  ImageContainer,
  SeeAll,
  MostPopularWithHeader,
} from "./MostPopular.styles";

const MostPopular = () => {
  const { popular, width } = useSelector((news) => news.news);

  // Wanted to show random results on each refresh/load
  // but random makes the app loads more than once
  // const random = Math.floor(Math.random() * popular.length);

  return (
    <MostPopularWithHeader>
      <PopularTitle>Most Popular</PopularTitle>
      <MostPopularContainer>
        {popular.length > 0
          ? popular.map((story) => (
              <PopularStoriesContainer
                key={story.id}
                href={story.url}
                target="_blank"
              >
                <StoryContainer>
                  <StoryTitle font="var(--font-header)">
                    {width > 830
                      ? story.title.split(" ").slice(0, 6).join(" ")
                      : story.title}
                    ...
                  </StoryTitle>
                  <StoryTitle color="var(--gray)">
                    {width > 830
                      ? story.abstract.split(" ").slice(0, 10).join(" ")
                      : story.abstract}
                    ...
                  </StoryTitle>
                </StoryContainer>
                <ImageContainer
                  background={
                    story.media[0]
                      ? story.media[0]["media-metadata"][2].url
                      : NewsPlaceholder
                  }
                />
              </PopularStoriesContainer>
            ))
          : null}
        <SeeAll
          popular="43px"
          href="https://www.nytimes.com/trending/?action=click&contentCollection=Africa&module=MostEmailed&pgtype=article&region=Marginalia&src=me&version=Full"
          target="_blank"
        >
          See All
        </SeeAll>
      </MostPopularContainer>
    </MostPopularWithHeader>
  );
};

export default MostPopular;
