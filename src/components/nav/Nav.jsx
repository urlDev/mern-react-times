import SearchSrc from '../../assets/searchIcon.svg';
import LogoComponent from '../logo-component/LogoComponent';

import { NavContainer, SearchIcon } from './Nav.styles';
import { Logo } from '../logo-component/LogoComponent.styles';

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
      <SearchIcon src={SearchSrc} alt="search icon" icon={icon} />
      <LogoComponent logo={logo} />
      <Logo to="/profile/login">
        <button>Login</button>
      </Logo>
    </NavContainer>
  );
};

export default Nav;
