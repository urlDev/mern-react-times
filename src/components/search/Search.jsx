import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSearch, openSearchModal } from '../../redux/actions/chart';

import SearchModal from '../search-modal/SearchModal';
import SearchSrc from '../../assets/searchIcon.svg';
import { NavSearchContainer, SearchIcon } from './Search.styles';

const Search = ({ icon }) => {
  const { open } = useSelector((chart) => chart.chart);
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
        <SearchIcon
          icon={icon}
          open={open}
          onClick={() => dispatch(openSearchModal())}
        >
          <img src={SearchSrc} alt="search icon" />
        </SearchIcon>
      </form>
      {open ? <SearchModal /> : null}
    </NavSearchContainer>
  );
};

export default Search;
