import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const history = createBrowserHistory();

const middlewares = [thunk, logger];

export default createStore(
    rootReducer(history),
    applyMiddleware(...middlewares, routerMiddleware(history)),
);