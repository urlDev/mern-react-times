import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchRating,
  fetchForex,
  clearSearchResults,
  openSearchModal,
  closeSearchModal,
} from '../../redux/actions/chart';

import {
  SearchModalContainer,
  ResultsContainer,
  SearchModalAllPage,
} from './SearchModal.styles';

const SearchModal = () => {
  const { searchResults } = useSelector((chart) => chart.chart);
  const dispatch = useDispatch();

  return (
    <SearchModalAllPage onClick={() => dispatch(closeSearchModal())}>
      <SearchModalContainer>
        {searchResults.length ? (
          searchResults.map((stock) => (
            <ResultsContainer
              to={`/details/${stock.symbol.toLowerCase()}`}
              onClick={() => {
                dispatch(fetchForex(stock.symbol));
                dispatch(fetchRating(stock.symbol));
                dispatch(clearSearchResults());
                dispatch(openSearchModal());
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: 'white',
            }}
          >
            <h1 style={{ margin: '0' }}>No results found</h1>
          </div>
        )}
      </SearchModalContainer>
    </SearchModalAllPage>
  );
};

export default SearchModal;
