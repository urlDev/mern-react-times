import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { changeHeader, clearError } from "../../redux/actions/news";

import ResponsiveMenu from "../responsive-menu/ResponsiveMenu";
import ResponsiveMenuModal from "../responsive-menu-modal/ResponsiveMenuModal";

import {
  StoryTopicHeadersContainer,
  TopicContainer,
  Date,
  StyledLink,
} from "./StoryTopicHeaders.styles";

export const topics = [
  "Home",
  "Arts",
  "Business",
  "Health",
  "Opinion",
  "Politics",
  "Science",
  "Sports",
  "Technology",
  "Travel",
];

const StoryTopics = () => {
  const { width, responsiveMenu } = useSelector((news) => news.news);
  const dispatch = useDispatch();

  return (
    <StoryTopicHeadersContainer>
      <Date>
        <span>{moment().format("dddd | ")}</span>
        {moment().format("MMM DD, YYYY")}
      </Date>
      <TopicContainer>
        {width < 1024 ? (
          <>
            <ResponsiveMenu />
            {responsiveMenu ? <ResponsiveMenuModal /> : null}
          </> //
        ) : (
          <>
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
          </> //
        )}
      </TopicContainer>
    </StoryTopicHeadersContainer>
  );
};

export default StoryTopics;
