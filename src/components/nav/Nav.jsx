import React from "react";
import { useSelector } from "../../utils/react-redux-hooks";
import { Link } from "react-router-dom";

import Search from "../search/Search";
import LogoComponent from "../logo-component/LogoComponent";
import NavUserImage from "../nav-user-image/NavUserImage";
import StoryTopicHeaders from "../story-topic-headers/StoryTopicHeaders";

import { Button, NavContainer } from "./Nav.styles";

const Nav = ({
  logo,
  icon,
  color,
  borderBottom,
  border,
  hoverColor,
  background,
}) => {
  const { user } = useSelector((user) => user.user);
  const { width } = useSelector((news) => news.news);
  const path = window.location.pathname;

  return (
    <NavContainer borderBottom={borderBottom}>
      {width < 768 ? <StoryTopicHeaders icon={icon} /> : <Search icon={icon} />}
      <LogoComponent logo={logo} />
      {user.name ? (
        <NavUserImage />
      ) : (
        <Link
          style={{ textDecoration: "none" }}
          to={
            path === "/profile/login" ? "/profile/register" : "/profile/login"
          }
        >
          <Button
            border={border}
            hoverColor={hoverColor}
            background={background}
            color={color}
          >
            {path === "/profile/login" ? "Register" : "Login"}
          </Button>
        </Link>
      )}
    </NavContainer>
  );
};

export default Nav;
