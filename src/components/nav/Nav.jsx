import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUser, LOGOUT_USER } from '../../redux/actions/user';

import Search from '../search/Search';
import LogoComponent from '../logo-component/LogoComponent';
import NavUserImage from '../nav-user-image/NavUserImage';

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
  const { user, token } = useSelector((user) => user.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // add boolean for if user is logged in or logged out etc.
    const localUser = JSON.parse(localStorage.getItem('user'));

    console.log(localUser ? 'yes there is' : 'nope');
  }, [dispatch, user, token]);

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
      {user.name ? (
        <NavUserImage />
      ) : (
        <Link style={{ textDecoration: 'none' }} to="/profile/login">
          <button>Login</button>
        </Link>
      )}
    </NavContainer>
  );
};

export default Nav;
