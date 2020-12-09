import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchChartData,
  fetchRating,
  fetchForex,
  setMarketDetail,
} from '../../redux/actions/chart';

import { SearchModalContainer, ResultsContainer } from './SearchModal.styles';

const SearchModal = () => {
  const { searchResults, chartTimeFrame } = useSelector((chart) => chart.chart);
  const dispatch = useDispatch();

  return (
    <SearchModalContainer>
      {searchResults.map((stock) => (
        <ResultsContainer
          to={`/${stock.symbol.toLowerCase()}`}
          onClick={() => {
            dispatch(fetchForex(stock.symbol));
            dispatch(fetchChartData(stock.symbol, chartTimeFrame));
            dispatch(fetchRating(stock.symbol));
          }}
          key={stock.symbol}
        >
          <h1>{stock.symbol}</h1>
          <h1>{stock.exchangeShortName}</h1>
        </ResultsContainer>
      ))}
    </SearchModalContainer>
  );
};

export default SearchModal;
