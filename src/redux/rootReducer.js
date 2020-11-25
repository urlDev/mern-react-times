import { combineReducers } from 'redux';

import chartReducer from './reducers/chart';
import newsReducer from './reducers/news';

const rootReducer = combineReducers({
    chart: chartReducer,
    news: newsReducer,
});

export default rootReducer;