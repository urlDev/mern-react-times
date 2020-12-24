import axios from "axios";

export const FETCH_FOREX_SUCCESS = "FETCH_FOREX_SUCCESS";
export const FETCH_CHART_ERROR = "FETCH_CHART_ERROR";
export const SET_LOADING = "SET_LOADING";
export const SET_LOADING_TRUE = "SET_LOADING_TRUE";
export const CHANGE_MARKET_TYPE = "CHANGE_MARKET_TYPE";
export const CHANGE_MARKET_NAME = "CHANGE_MARKET_NAME";
export const SET_MARKET_DETAIL = "SET_MARKET_DETAIL";
export const SET_CHART_DATA = "SET_CHART_DATA";
export const CLEAN_CHART_DATA = "CLEAN_CHART_DATA";
export const SET_CHART_TIME_FRAME = "SET_CHART_TIME_FRAME";
export const SET_RATING = "SET_RATING";
export const SET_HOME_CHART_DATA = "SET_HOME_CHART_DATA";
export const CLEAN_STATE = "CLEAN_STATE";
export const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS";
export const SET_SEARCH_MARKET_DETAIL = "SET_SEARCH_MARKET_DETAIL";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const OPEN_SEARCH_MODAL = "OPEN_SEARCH_MODAL";
export const CLOSE_SEARCH_MODAL = "CLOSE_SEARCH_NODAL";

export const closeSearchModal = () => ({
  type: CLOSE_SEARCH_MODAL,
});

export const openSearchModal = () => ({
  type: OPEN_SEARCH_MODAL,
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const setSearchMarketDetail = (details) => ({
  type: SET_SEARCH_MARKET_DETAIL,
  payload: details,
});

export const getSearchResults = (result) => ({
  type: GET_SEARCH_RESULTS,
  payload: result,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setLoadingTrue = () => ({
  type: SET_LOADING_TRUE,
});

export const cleanState = () => ({
  type: CLEAN_STATE,
});

export const setHomeChartData = (chart) => ({
  type: SET_HOME_CHART_DATA,
  payload: [chart],
});

export const setRating = (rating) => ({
  type: SET_RATING,
  payload: rating,
});

export const setChartTimeFrame = (time) => ({
  type: SET_CHART_TIME_FRAME,
  payload: time,
});

export const setChartData = (data) => ({
  type: SET_CHART_DATA,
  payload: data,
});

export const cleanChartData = () => ({
  type: CLEAN_CHART_DATA,
});

export const setMarketDetail = (market) => ({
  type: SET_MARKET_DETAIL,
  payload: market,
});

export const changeMarketType = (market) => ({
  type: CHANGE_MARKET_TYPE,
  payload: market,
});

export const changeMarketName = (market) => ({
  type: CHANGE_MARKET_NAME,
  payload: market,
});

export const fetchForexSuccess = (chart) => ({
  type: FETCH_FOREX_SUCCESS,
  payload: chart,
});

export const fetchChartError = (error) => ({
  type: FETCH_CHART_ERROR,
  payload: error,
});

export const fetchForex = (market) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/quote/${market}?apikey=${process.env.REACT_APP_CHART_KEY}`
    );
    const data = await response.data;
    // FinancialModel API doesn't send error if it's about limit reach.
    // In that sense, they send an error message with 200 status. Weird.
    // Thats why I am catching that error here and dispatching it.
    if (data.length) {
      return data.length === 1
        ? [dispatch(setSearchMarketDetail(data))]
        : dispatch(fetchForexSuccess(data));
    } else {
      return dispatch(fetchChartError(data));
    }
  } catch (error) {
    return dispatch(fetchChartError(error));
  }
};

export const fetchChartData = (symbol, timeFrame) => async (dispatch) => {
  dispatch(cleanChartData());
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-chart/${timeFrame}/${symbol}?apikey=${process.env.REACT_APP_CHART_KEY}`
    );
    const data = await response.data;
    return dispatch(setChartData(data));
  } catch (error) {
    return dispatch(fetchChartError(error));
  }
};

export const fetchRating = (symbol) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/rating/${symbol}?apikey=${process.env.REACT_APP_CHART_KEY}`
    );
    const data = await response.data;
    return dispatch(setRating(data));
  } catch (error) {
    return dispatch(fetchChartError(error));
  }
};

/*
This deserves to be mentioned.
Few months ago, when I was making the first version of this app, I used array.map to fetch charts.
Because of the async nation and using array map method, response was coming irregular and I had to sort them.
Now, with using for of loop, I dont need to write any extra code because loop waits for one to finish to move on.
Plus, its so clean!
Yet another homerun for me! 😁😎
*/
export const fetchHomeChart = (symbols) => async (dispatch) => {
  const symbolsArray = symbols.split(",").sort();
  let charts = [];
  try {
    // dispatch(setLoadingTrue());
    dispatch(cleanState());
    for (let symbol of symbolsArray) {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-chart/1hour/${symbol}?apikey=${process.env.REACT_APP_CHART_KEY}`
      );
      const data = response.data;
      charts.push(data);
    }
    return charts.length
      ? dispatch(setHomeChartData(charts))
      : dispatch(fetchChartError(charts));
    // dispatch(setLoading());
  } catch (error) {
    return dispatch(fetchChartError(error));
  }
};

export const fetchSearch = (input) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/search?query=${input}&limit=10&apikey=${process.env.REACT_APP_CHART_KEY}`
    );
    const data = response.data;
    return dispatch(getSearchResults(data));
  } catch (error) {
    return dispatch(fetchChartError(error));
  }
};
