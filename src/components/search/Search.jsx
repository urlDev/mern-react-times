import React from "react";
import { useDispatch, useSelector } from "../../utils/react-redux-hooks";
import { useHistory } from "react-router-dom";

import {
  closeSearchModal,
  fetchSearch,
  openSearchModal,
} from "../../redux/actions/chart";

import SearchModal from "../search-modal/SearchModal";
import SearchSrc from "../../assets/searchIcon.svg";
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
          onClick={() => dispatch(openSearchModal())}
        >
          <img src={SearchSrc} alt="search icon" />
        </SearchIcon>
      </form>
      <SearchModal />
    </NavSearchContainer>
  );
};

export default Search;
