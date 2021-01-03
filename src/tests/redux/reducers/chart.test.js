import chartReducer from "../../../redux/reducers/chart";

import {
  FETCH_FOREX_SUCCESS,
  FETCH_CHART_ERROR,
  SET_LOADING,
  SET_LOADING_TRUE,
  CHANGE_MARKET_NAME,
  CHANGE_MARKET_TYPE,
  SET_MARKET_DETAIL,
  SET_CHART_DATA,
  CLEAN_CHART_DATA,
  SET_CHART_TIME_FRAME,
  SET_RATING,
  SET_HOME_CHART_DATA,
  CLEAN_STATE,
  GET_SEARCH_RESULTS,
  SET_SEARCH_MARKET_DETAIL,
  CLEAR_SEARCH_RESULTS,
  OPEN_SEARCH_MODAL,
  CLOSE_SEARCH_MODAL,
} from "../../../redux/actions/chart";

import {
  forexLengthTwo,
  chartTimeFrame,
  marketType,
  marketName,
  rating,
  searchResult,
  errorChart,
  marketDetail,
  chartData,
  homeChartData,
} from "../../fixtures/chart";

const initialState = {
  loadingChart: false,
  forex: [],
  errorChart: null,
  // Indexes (market type index's symbols) are first to load.
  marketType: "%5EGSPC,%5ERUA,%5EDJI,%5ENDX,%5EN225,%5EFTSE",
  marketName: "Indexes",
  marketDetail: {},
  chartData: [],
  chartTimeFrame: "1hour",
  rating: [],
  homeChartData: [],
  searchResults: [],
  open: false,
};

test("Should load the initial state successfully", () => {
  const state = chartReducer(undefined, {});

  expect(state).toEqual({
    loadingChart: false,
    forex: [],
    errorChart: null,
    marketType: "%5EGSPC,%5ERUA,%5EDJI,%5ENDX,%5EN225,%5EFTSE",
    marketName: "Indexes",
    marketDetail: {},
    chartData: [],
    chartTimeFrame: "1hour",
    rating: [],
    homeChartData: [],
    searchResults: [],
    open: false,
  });
});

test("Should fetch and set the forex data successfully", () => {
  const state = chartReducer(initialState, {
    type: FETCH_FOREX_SUCCESS,
    payload: forexLengthTwo,
  });

  expect(state).toEqual({
    ...initialState,
    forex: forexLengthTwo,
  });
});

test("Should show and set the fetch error", () => {
  const state = chartReducer(initialState, {
    type: FETCH_CHART_ERROR,
    payload: errorChart,
  });

  expect(state).toEqual({
    ...initialState,
    errorChart,
  });
});

test("Should change and set the market type", () => {
  const state = chartReducer(initialState, {
    type: CHANGE_MARKET_TYPE,
    payload: marketType,
  });

  expect(state).toEqual({
    ...initialState,
    marketType,
  });
});

test("Should change and set the market name", () => {
  const state = chartReducer(initialState, {
    type: CHANGE_MARKET_NAME,
    payload: marketName,
  });

  expect(state).toEqual({
    ...initialState,
    marketName,
  });
});

test("Should set market detail", () => {
  const state = chartReducer(initialState, {
    type: SET_MARKET_DETAIL,
    payload: marketDetail,
  });

  expect(state).toEqual({
    ...initialState,
    marketDetail,
  });
});

test("Should set chart data", () => {
  const state = chartReducer(initialState, {
    type: SET_CHART_DATA,
    payload: chartData,
  });

  expect(state).toEqual({
    ...initialState,
    chartData,
  });
});

test("Should clean chart data and set it to empty array", () => {
  const state = chartReducer(initialState, { type: CLEAN_CHART_DATA });

  expect(state).toEqual({
    ...initialState,
    chartData: [],
  });
});

test("Should set chart time frame", () => {
  const state = chartReducer(initialState, {
    type: SET_CHART_TIME_FRAME,
    payload: chartTimeFrame,
  });

  expect(state).toEqual({
    ...initialState,
    chartTimeFrame,
  });
});

test("Should set rating", () => {
  const state = chartReducer(initialState, {
    type: SET_RATING,
    payload: rating,
  });

  expect(state).toEqual({
    ...initialState,
    rating,
  });
});

test("Should set chart data for cards in home page", () => {
  const state = chartReducer(initialState, {
    type: SET_HOME_CHART_DATA,
    payload: homeChartData,
  });

  expect(state).toEqual({
    ...initialState,
    homeChartData,
  });
});

test("Should clean cards chart data", () => {
  const state = chartReducer(initialState, { type: CLEAN_STATE });

  expect(state).toEqual({
    ...initialState,
    homeChartData: [],
  });
});

test("Should set the loading state to false", () => {
  const state = chartReducer(initialState, { type: SET_LOADING });

  expect(state).toEqual({
    ...initialState,
    loadingChart: false,
  });
});

test("Should set the loading state to true", () => {
  const state = chartReducer(initialState, { type: SET_LOADING_TRUE });

  expect(state).toEqual({
    ...initialState,
    loadingChart: true,
  });
});

test("Should get search results and set them", () => {
  const state = chartReducer(initialState, {
    type: GET_SEARCH_RESULTS,
    payload: searchResult,
  });

  expect(state).toEqual({
    ...initialState,
    searchResults: searchResult,
  });
});

test("Should set selected search results` market detail", () => {
  const state = chartReducer(initialState, {
    type: SET_SEARCH_MARKET_DETAIL,
    payload: marketDetail,
  });

  expect(state).toEqual({
    ...initialState,
    marketDetail: marketDetail[0],
  });
});

test("Should clear search results array", () => {
  const state = chartReducer(initialState, { type: CLEAR_SEARCH_RESULTS });

  expect(state).toEqual({
    ...initialState,
    searchResults: [],
  });
});

test("Should set the search modals state to true", () => {
  const state = chartReducer(initialState, { type: OPEN_SEARCH_MODAL });

  expect(state).toEqual({
    ...initialState,
    open: true,
  });
});

test("Should set the search modals state to false", () => {
  const state = chartReducer(initialState, { type: CLOSE_SEARCH_MODAL });

  expect(state).toEqual({
    ...initialState,
    open: false,
  });
});
