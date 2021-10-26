import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootReducer, rootSaga } from "./rootDuck";

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */

sagaMiddleware.run(rootSaga);

export default store;
