import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Search from "../search/Search";
import LogoComponent from "../logo-component/LogoComponent";
import NavUserImage from "../nav-user-image/NavUserImage";
import StoryTopicHeaders from "../story-topic-headers/StoryTopicHeaders";

import { NavContainer } from "./Nav.styles";

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
    <NavContainer
      color={color}
      borderBottom={borderBottom}
      border={border}
      hoverColor={hoverColor}
      background={background}
    >
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
          <button>{path === "/profile/login" ? "Register" : "Login"}</button>
        </Link>
      )}
    </NavContainer>
  );
};

export default Nav;
