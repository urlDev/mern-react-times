import React from "react";
import { useSelector, useDispatch } from "../../utils/react-redux-hooks";

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
  const { searchResults, open } = useSelector((chart) => chart.chart);
  const dispatch = useDispatch();

  return (
    <>
      {open ? (
        <SearchModalAllPage
          onClick={() => {
            dispatch(closeSearchModal());
          }}
        >
          <SearchModalContainer>
            {searchResults.length ? (
              searchResults.map((stock) => (
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
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  color: "white",
                }}
              >
                <h1 style={{ margin: "0" }}>No results found</h1>
              </div>
            )}
          </SearchModalContainer>
        </SearchModalAllPage>
      ) : null}
    </> //
  );
};

export default SearchModal;
