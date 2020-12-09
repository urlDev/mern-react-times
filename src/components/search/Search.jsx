import React from 'react';

import SearchModal from '../search-modal/SearchModal';
import SearchSrc from '../../assets/searchIcon.svg';
import { NavSearchContainer, SearchIcon } from './Search.styles';

const Search = ({ icon }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <NavSearchContainer open={open}>
        <input
          type="text"
          placeholder="Search for a company or symbol"
          open={open}
        />
        <SearchIcon icon={icon} open={open} onClick={() => setOpen(!open)}>
          <img src={SearchSrc} alt="search icon" />
        </SearchIcon>
        {open && <SearchModal />}
      </NavSearchContainer>
    </> //
  );
};

export default Search;
