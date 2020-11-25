import SearchSrc from '../../assets/searchIcon.svg';
import LogoSrc from '../../assets/logo.svg';

import { NavContainer, Logo, SearchIcon } from './Nav.styles';

const Nav = () => {
  return (
    <NavContainer>
      <SearchIcon src={SearchSrc} alt="search icon" />

      <Logo to="/">
        <img style={{ height: '30px' }} src={LogoSrc} alt="react times logo" />
      </Logo>

      <button>Sign in</button>
    </NavContainer>
  );
};

export default Nav;
