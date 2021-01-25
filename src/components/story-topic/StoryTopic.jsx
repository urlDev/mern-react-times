import { useSelector } from "utils/react-redux-hooks";

import { StoryTopicContainer } from "./StoryTopic.styles";

const StoryTopic = () => {
  const { header } = useSelector((state) => state.news);

  return (
    <StoryTopicContainer>
      <h1>{header}</h1>
    </StoryTopicContainer>
  );
};

export default StoryTopic;
