import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchSearch } from '../../redux/actions/chart';

import SearchModal from '../search-modal/SearchModal';
import SearchSrc from '../../assets/searchIcon.svg';
import { NavSearchContainer, SearchIcon } from './Search.styles';

const Search = ({ icon }) => {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(input));
    setInput('');
  };

  return (
    <NavSearchContainer open={open}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a company or symbol"
          onChange={(e) => {
            setInput(e.target.value);
            dispatch(fetchSearch(e.target.value));
          }}
          open={open}
        />
        <SearchIcon icon={icon} open={open} onClick={() => setOpen(!open)}>
          <img src={SearchSrc} alt="search icon" />
        </SearchIcon>
      </form>
      {open ? <SearchModal /> : null}
    </NavSearchContainer>
  );
};

export default Search;
