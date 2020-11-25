import { FETCH_FOREX_SUCCESS, FETCH_CHART_ERROR } from '../actions/chart';

const initialState = {
    loading: true,
    forex: [],
    error: null,
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
        default:
            return state;
    }
};

export default chartReducer;