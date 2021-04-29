import * as ChartActions from 'redux/actions/chart';

const initialState = {
  loadingChart: false,
  forex: [],
  errorChart: null,
  // Indexes (market type index's symbols) are first to load.
  marketType: '%5EGSPC,%5ERUA,%5EDJI,%5ENDX,%5EN225,%5EFTSE',
  marketName: 'Indexes',
  marketDetail: {},
  chartData: [],
  chartTimeFrame: '1hour',
  rating: [],
  homeChartData: [],
  searchResults: [],
  open: false,
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChartActions.FETCH_FOREX_SUCCESS:
      return {
        ...state,
        forex: action.payload.flat(),
      };
    case ChartActions.FETCH_CHART_ERROR:
      return {
        ...state,
        errorChart: action.payload,
      };
    case ChartActions.CHANGE_MARKET_TYPE:
      return {
        ...state,
        marketType: action.payload,
      };
    case ChartActions.CHANGE_MARKET_NAME:
      return {
        ...state,
        marketName: action.payload,
      };
    case ChartActions.SET_MARKET_DETAIL:
      return {
        ...state,
        marketDetail: action.payload,
      };
    case ChartActions.SET_CHART_DATA:
      return {
        ...state,
        chartData: action.payload,
      };
    case ChartActions.CLEAN_CHART_DATA:
      return {
        ...state,
        chartData: [],
      };
    case ChartActions.SET_CHART_TIME_FRAME:
      return {
        ...state,
        chartTimeFrame: action.payload,
      };
    case ChartActions.SET_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    case ChartActions.SET_HOME_CHART_DATA:
      return {
        ...state,
        // homeChartData: [...state.homeChartData, action.payload],
        homeChartData: action.payload,
      };
    case ChartActions.CLEAN_STATE:
      return {
        ...state,
        homeChartData: [],
      };
    case ChartActions.SET_LOADING:
      return {
        ...state,
        loadingChart: false,
      };
    case ChartActions.SET_LOADING_TRUE:
      return {
        ...state,
        loadingChart: true,
      };
    case ChartActions.GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case ChartActions.SET_SEARCH_MARKET_DETAIL:
      return {
        ...state,
        marketDetail: action.payload[0],
      };
    case ChartActions.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      };
    case ChartActions.OPEN_SEARCH_MODAL:
      return {
        ...state,
        open: true,
      };
    case ChartActions.CLOSE_SEARCH_MODAL:
      return {
        ...state,
        open: false,
      };
    case ChartActions.TOGGLE_SEARCH_MODAL:
      return {
        ...state,
        open: !state.open,
      };
    default:
      return state;
  }
};

export default chartReducer;
