import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchRating,
  fetchForex,
  clearSearchResults,
  closeSearchModal,
} from "../../redux/actions/chart";

import {
  SearchModalContainer,
  ResultsContainer,
  SearchModalAllPage,
} from "./SearchModal.styles";

const SearchModal = () => {
  const { searchResults } = useSelector((chart) => chart.chart);
  const dispatch = useDispatch();

  return (
    <>
      {searchResults.length ? (
        <SearchModalAllPage
          onClick={() => {
            dispatch(closeSearchModal());
            dispatch(clearSearchResults());
          }}
        >
          <SearchModalContainer>
            {searchResults.map((stock) => (
              <ResultsContainer
                to={`/details/${stock.symbol.toLowerCase()}`}
                onClick={() => {
                  dispatch(fetchForex(stock.symbol));
                  dispatch(fetchRating(stock.symbol));
                  dispatch(clearSearchResults());
                  dispatch(closeSearchModal());
                }}
                key={stock.symbol}
              >
                <h1>{stock.symbol}</h1>
                <h1>{stock.exchangeShortName}</h1>
              </ResultsContainer>
            ))}
          </SearchModalContainer>{" "}
        </SearchModalAllPage>
      ) : null}
    </> //
  );
};

export default SearchModal;
