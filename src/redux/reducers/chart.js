import {
    FETCH_FOREX_SUCCESS,
    FETCH_CHART_ERROR,
    CHANGE_MARKET_TYPE,
    SET_MARKET_DETAIL,
    SET_CHART_DATA,
} from '../actions/chart';

const initialState = {
    loading: true,
    forex: [],
    error: null,
    // Indexes are first to load.
    marketType: '%5EGSPC,%5ERUA,%5EDJI,DX-Y.NYB,%5ENDX,%5EN225,%5EFTSE',
    marketDetail: {},
    chartData: [],
};

const chartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FOREX_SUCCESS:
            return {
                ...state,
                forex: action.payload.slice(0, 30),
                loading: false,
            };
        case FETCH_CHART_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case CHANGE_MARKET_TYPE:
            return {
                ...state,
                marketType: action.payload,
            };
        case SET_MARKET_DETAIL:
            return {
                ...state,
                marketDetail: action.payload.data,
            };
        case SET_CHART_DATA:
            return {
                ...state,
                chartData: action.payload,
            };
        default:
            return state;
    }
};

export default chartReducer;