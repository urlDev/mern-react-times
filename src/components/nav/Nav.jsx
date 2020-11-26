import { useDispatch } from 'react-redux';

import { changeHeader } from '../../redux/actions/news';

import SearchSrc from '../../assets/searchIcon.svg';
import LogoSrc from '../../assets/logo.svg';

import { NavContainer, Logo, SearchIcon } from './Nav.styles';

const Nav = () => {
  const dispatch = useDispatch();

  return (
    <NavContainer>
      <SearchIcon src={SearchSrc} alt="search icon" />

      <Logo to="/home">
        <img
          style={{ height: '25px' }}
          src={LogoSrc}
          alt="react times logo"
          onClick={() => dispatch(changeHeader('Home'))}
        />
      </Logo>

      <button>Sign in</button>
    </NavContainer>
  );
};

export default Nav;
