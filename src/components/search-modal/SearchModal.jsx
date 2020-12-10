import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchChartData,
  fetchRating,
  fetchForex,
  clearSearchResults,
  openSearchModal,
} from '../../redux/actions/chart';

import { SearchModalContainer, ResultsContainer } from './SearchModal.styles';

const SearchModal = () => {
  const { searchResults, chartTimeFrame } = useSelector((chart) => chart.chart);
  const dispatch = useDispatch();

  return (
    <SearchModalContainer>
      {searchResults.length ? (
        searchResults.map((stock) => (
          <ResultsContainer
            to={`/details/${stock.symbol.toLowerCase()}`}
            onClick={() => {
              dispatch(fetchForex(stock.symbol));
              dispatch(fetchChartData(stock.symbol, chartTimeFrame));
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
  );
};

export default SearchModal;
