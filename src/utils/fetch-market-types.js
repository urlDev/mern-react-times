import { changeMarketType, changeMarketName } from "../redux/actions/chart";

const fetchMarketTypes = (dispatch, market) => {
  //  One api endpoint can be used for all market quotes
  //  So I first determine the market type
  //  Then, checking which market type client has clicked on
  //  According to market, I pre-determined tickers/symbols
  //  With a switch function, I dispatch the related market types
  //  desired tickers to redux store.
  //  So with all this, I can use one fetch function for all market kinds,
  //  Therefore, less fetch calls, less code.
  //  More comments as it seems😁
  const Indexes = "%5EGSPC,%5ERUA,%5EDJI,%5ENDX,%5EN225,%5EFTSE";
  const Crypto = "BTCUSD,LTCUSD,XLMUSD,BCNUSD,ETHUSD,ETCUSD";
  const Forex = "EURUSD,USDJPY,GBPUSD,EURGBP,EURJPY,GBPJPY";
  const Stocks = "AAPL,FB,GOOG,TSLA,NFLX,AMZN";
  const Commodities = "ZGUSD,CLUSD,HGUSD,SIUSD,PLUSD,BZUSD";

  switch (market) {
    case "Indexes":
      return [
        dispatch(changeMarketType(Indexes)),
        dispatch(changeMarketName("Indexes")),
      ];
    case "Crypto":
      return [
        dispatch(changeMarketType(Crypto)),
        dispatch(changeMarketName("Crypto")),
      ];
    case "Forex":
      return [
        dispatch(changeMarketType(Forex)),
        dispatch(changeMarketName("Forex")),
      ];
    case "Stocks":
      return [
        dispatch(changeMarketType(Stocks)),
        dispatch(changeMarketName("Stocks")),
      ];
    case "Commodities":
      return [
        dispatch(changeMarketType(Commodities)),
        dispatch(changeMarketName("Commodities")),
      ];
    default:
      return Indexes;
  }
};

export default fetchMarketTypes;
