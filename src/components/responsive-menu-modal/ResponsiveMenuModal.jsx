import { useDispatch } from "../../utils/react-redux-hooks";

import {
  changeHeader,
  clearError,
  closeResponsiveMenu,
} from "../../redux/actions/news";
import { topics } from "../story-topic-headers/StoryTopicHeaders";

import {
  MenuModalAllPage,
  MenuModalContainer,
} from "./ResponsiveMenuModal.styles";

import { StyledLink } from "../story-topic-headers/StoryTopicHeaders.styles";

const ResponsiveMenuModal = () => {
  const dispatch = useDispatch();

  return (
    <MenuModalAllPage onClick={() => dispatch(closeResponsiveMenu())}>
      <MenuModalContainer>
        {topics.map((topic) => (
          <StyledLink key={topic} to={`/${topic.toLowerCase()}`}>
            <span
              onClick={() => {
                dispatch(changeHeader(topic.toLowerCase()));
                dispatch(closeResponsiveMenu());
                dispatch(clearError());
              }}
            >
              {topic}
            </span>
          </StyledLink>
        ))}
      </MenuModalContainer>
    </MenuModalAllPage>
  );
};

export default ResponsiveMenuModal;
