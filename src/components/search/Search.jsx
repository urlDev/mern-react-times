import React from "react";
import { useDispatch, useSelector } from "utils/react-redux-hooks";
import { useHistory } from "react-router-dom";

import {
  closeSearchModal,
  fetchSearch,
  openSearchModal,
  toggleSearchModal,
} from "redux/actions/chart";

import SearchSrc from "assets/searchIcon.svg";

import SearchModal from "components/search-modal/SearchModal";

import { NavSearchContainer, SearchIcon } from "./Search.styles";

const Search = ({ icon }) => {
  const { open } = useSelector((chart) => chart.chart);
  const { width } = useSelector((news) => news.news);
  const [input, setInput] = React.useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(input));
    history.push(`/search/${input}`);
    setInput("");
    dispatch(closeSearchModal());
  };

  return (
    <NavSearchContainer open={open}>
      <form
        onSubmit={handleSubmit}
        onClick={width < 768 ? () => dispatch(openSearchModal()) : null}
      >
        <input
          type="text"
          placeholder="Search for a company or symbol"
          onChange={(e) => {
            setInput(e.target.value);
            dispatch(fetchSearch(e.target.value));
          }}
          open={open}
          value={input}
        />
        <SearchIcon
          icon={icon}
          open={open}
          onClick={() => dispatch(toggleSearchModal())}
        >
          <img src={SearchSrc} alt="search icon" />
        </SearchIcon>
      </form>
      <SearchModal />
    </NavSearchContainer>
  );
};

export default Search;
