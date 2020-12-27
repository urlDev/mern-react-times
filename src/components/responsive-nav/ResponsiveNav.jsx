import { useSelector } from "react-redux";

import Nav from "../nav/Nav";
import Search from "../search/Search";
import StoryTopicHeaders from "../story-topic-headers/StoryTopicHeaders";

import LogoDarkSrc from "../../assets/logo.svg";

const ResponsiveNav = () => {
  const { width } = useSelector((news) => news.news);
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
