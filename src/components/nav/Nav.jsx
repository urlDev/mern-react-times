import SearchSrc from '../../assets/searchIcon.svg';
import LogoComponent from '../logo-component/LogoComponent';

import { NavContainer, SearchIcon } from './Nav.styles';
import { Logo } from '../logo-component/LogoComponent.styles';

const Nav = ({ logo, icon, color }) => {
  return (
    <NavContainer color={color}>
      <SearchIcon src={SearchSrc} alt="search icon" icon={icon} />
      <LogoComponent logo={logo} />
      <Logo to="/login">
        <button>Sign in</button>
      </Logo>
    </NavContainer>
  );
};

export default Nav;
