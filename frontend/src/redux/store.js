import logger from "redux-logger";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";

import { rawReducer } from "./reducers/generic";

const reducers = combineReducers({
  rawData: rawReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(logger)));
// let store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(logger)
// )

export default store;
