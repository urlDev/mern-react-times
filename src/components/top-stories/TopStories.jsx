import React from "react";
import moment from "moment";
import { useSelector } from "utils/react-redux-hooks";

import StoryTopic from "components/story-topic/StoryTopic";

import { Date } from "components/story-topic-headers/StoryTopicHeaders.styles";
import { SeeAll } from "components/most-popular/MostPopular.styles";
import {
  TopStoriesContainer,
  StoryContainer,
  Tag,
  Title,
  SubTitle,
  TagContainer,
} from "./TopStories.styles";

const TopStories = React.memo(() => {
  const { story, width } = useSelector((news) => news.news);

  return (
    <div>
      <StoryTopic />
      <TopStoriesContainer>
        {story.slice(0, 3).map((data) => (
          <StoryContainer key={data.title}>
            <img
              src={
                width < 1200 ? data.multimedia[0].url : data.multimedia[3].url
              }
              alt="story"
            />
            <TagContainer>
              <h1>
                <Tag>{data.section}</Tag>
              </h1>
              <Date margin="10px" width="30%">
                {moment(data.created_date).format("MMM DD, YYYY")}
              </Date>
            </TagContainer>

            <Title header={data.title.split(" ")}>{data.title}</Title>
            <SubTitle>
              {data.abstract.split(" ").slice(0, 20).join(" ")}...
            </SubTitle>
            <SeeAll href={data.url} target="_blank">
              Continue Reading
            </SeeAll>
          </StoryContainer>
        ))}
      </TopStoriesContainer>
    </div>
  );
});

export default TopStories;
