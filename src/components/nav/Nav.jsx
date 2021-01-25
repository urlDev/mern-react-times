import React from "react";
import { useSelector, useDispatch } from "utils/react-redux-hooks";
import { Link } from "react-router-dom";

import Search from "components/search/Search";
import LogoComponent from "components/logo-component/LogoComponent";
import NavUserImage from "components/nav-user-image/NavUserImage";
import StoryTopicHeaders from "components/story-topic-headers/StoryTopicHeaders";

import { Button, NavContainer } from "./Nav.styles";
import { closeSearchModal } from "redux/actions/chart";

const Nav = ({
  logo,
  icon,
  color,
  borderBottom,
  border,
  hoverColor,
  background,
}) => {
  const { user } = useSelector((state) => state.user);
  const { width } = useSelector((state) => state.news);
  const dispatch = useDispatch();

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
            onClick={() => {
              dispatch(closeSearchModal());
            }}
          >
            {path === "/profile/login" ? "Register" : "Login"}
          </Button>
        </Link>
      )}
    </NavContainer>
  );
};

export default Nav;
