import { useSelector } from "utils/react-redux-hooks";

import Nav from "components/nav/Nav";
import Search from "components/search/Search";
import StoryTopicHeaders from "components/story-topic-headers/StoryTopicHeaders";

import LogoDarkSrc from "assets/logo.png";

const ResponsiveNav = () => {
  const { width } = useSelector((state) => state.news);
  return (
    <>
      {width < 768 ? (
        <>
          <Nav
            logo={LogoDarkSrc}
            borderBottom="1px solid lightgray"
            icon="block"
          />
          <Search icon="block" />
        </> //
      ) : (
        <>
          <Nav
            logo={LogoDarkSrc}
            borderBottom="1px solid lightgray"
            icon="block"
          />
          <StoryTopicHeaders icon="block" />
        </> //
      )}
    </> //
  );
};

export default ResponsiveNav;
