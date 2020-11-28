import React from 'react';
import { useDispatch } from 'react-redux';

import { changeMarketType } from '../../redux/actions/chart';

import HomeMarketCards from '../home-market-cards/HomeMarketCards';

import {
  MarketComponentsContainer,
  MarketHeaderContainer,
  MarketTitle,
  MarketMenu,
} from './MarketComponents.styles';

const MarketComponents = () => {
  // First, I made market types array, the ones that I want to show in home page
  const marketTypes = ['Indexes', 'Crypto', 'Forex', 'Stocks', 'Commodities'];
  const dispatch = useDispatch();

  const fetchMarketTypes = (market) => {
    //  One api endpoint can be used for all market quotes
    //  So I first determine the market type
    //  Then, checking which market type client has clicked on
    //  According to market, I pre-determined tickers/symbols
    //  With a switch function, I dispatch the related market types
    //  desired tickers to redux store.
    //  So with all this, I can use one fetch function for all market kinds,
    //  Therefore, less fetch calls, less code.
    //  More comments as it seems😁
    const Indexes = '%5EGSPC,%5ERUA,%5EDJI,DX-Y.NYB,%5ENDX,%5EN225,%5EFTSE';
    const Crypto = 'BTCUSD,LTCUSD,XLMUSD,BCNUSD,ETHUSD,ETCUSD,BCHUSD';
    const Forex = 'EURUSD,USDJPY,GBPUSD,EURGBP,EURJPY,GBPJPY,NZDUSD,XAUUSD';
    const Stocks = 'AAPL,FB,GOOG,TSLA,NFLX,AMZN';
    const Commodities = 'ZGUSD,CLUSD,HGUSD,SIUSD,PLUSD,BZUSD';

    switch (market) {
      case 'Indexes':
        return dispatch(changeMarketType(Indexes));
      case 'Crypto':
        return dispatch(changeMarketType(Crypto));
      case 'Forex':
        return dispatch(changeMarketType(Forex));
      case 'Stocks':
        return dispatch(changeMarketType(Stocks));
      case 'Commodities':
        return dispatch(changeMarketType(Commodities));
      default:
        return market;
    }
  };

  return (
    <MarketComponentsContainer>
      <MarketHeaderContainer>
        <MarketTitle>Market Snapshot</MarketTitle>
        {marketTypes.map((market) => (
          <MarketMenu
            onClick={() => {
              fetchMarketTypes(market);
            }}
          >
            {market}
          </MarketMenu>
        ))}
      </MarketHeaderContainer>
      <HomeMarketCards />
    </MarketComponentsContainer>
  );
};

export default MarketComponents;
