import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../search/Search';
import LogoComponent from '../logo-component/LogoComponent';

import { NavContainer } from './Nav.styles';

const Nav = ({
  logo,
  icon,
  color,
  borderBottom,
  border,
  hoverColor,
  background,
}) => {
  return (
    <NavContainer
      color={color}
      borderBottom={borderBottom}
      border={border}
      hoverColor={hoverColor}
      background={background}
    >
      <Search icon={icon} />
      <LogoComponent logo={logo} />
      <Link style={{ textDecoration: 'none' }} to="/profile/login">
        <button>Login</button>
      </Link>
    </NavContainer>
  );
};

export default Nav;
