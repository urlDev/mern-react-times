import {
  FETCH_FOREX_SUCCESS,
  FETCH_CHART_ERROR,
  CHANGE_MARKET_TYPE,
  CHANGE_MARKET_NAME,
  SET_MARKET_DETAIL,
  SET_CHART_DATA,
  SET_CHART_TIME_FRAME,
  SET_RATING,
  SET_HOME_CHART_DATA,
  CLEAN_STATE,
  SET_LOADING,
  GET_SEARCH_RESULTS,
  SET_SEARCH_MARKET_DETAIL,
  CLEAR_SEARCH_RESULTS,
  OPEN_SEARCH_MODAL,
  SET_LOADING_TRUE,
  CLOSE_SEARCH_MODAL,
  CLEAN_CHART_DATA,
} from "../actions/chart";

const initialState = {
  loadingChart: false,
  forex: [],
  errorChart: null,
  // Indexes are first to load.
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

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOREX_SUCCESS:
      return {
        ...state,
        forex: action.payload,
      };
    case FETCH_CHART_ERROR:
      return {
        ...state,
        errorChart: action.payload,
      };
    case CHANGE_MARKET_TYPE:
      return {
        ...state,
        marketType: action.payload,
      };
    case CHANGE_MARKET_NAME:
      return {
        ...state,
        marketName: action.payload,
      };
    case SET_MARKET_DETAIL:
      return {
        ...state,
        marketDetail: action.payload,
      };
    case SET_CHART_DATA:
      return {
        ...state,
        chartData: action.payload,
      };
    case CLEAN_CHART_DATA:
      return {
        ...state,
        chartData: [],
      };
    case SET_CHART_TIME_FRAME:
      return {
        ...state,
        chartTimeFrame: action.payload,
      };
    case SET_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    case SET_HOME_CHART_DATA:
      console.log(action.payload[0]);
      return {
        ...state,
        // homeChartData: [...state.homeChartData, action.payload],
        homeChartData: action.payload[0],
      };
    case CLEAN_STATE:
      return {
        ...state,
        homeChartData: [],
      };
    case SET_LOADING:
      return {
        ...state,
        loadingChart: false,
      };
    case SET_LOADING_TRUE:
      return {
        ...state,
        loadingChart: true,
      };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case SET_SEARCH_MARKET_DETAIL:
      return {
        ...state,
        marketDetail: action.payload[0],
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      };
    case OPEN_SEARCH_MODAL:
      return {
        ...state,
        open: !state.open,
      };
    case CLOSE_SEARCH_MODAL:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default chartReducer;
