import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "redux/rootReducer";

import thunk from "redux-thunk";
import logger from "redux-logger";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, logger];

export default createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(...middlewares, routerMiddleware(history)))
);
