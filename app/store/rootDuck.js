import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import { authReducer }  from "../reducers/authReducer";
import { restReducer }  from "../reducers/restReducer";
import { investigationReducer } from "../reducers/investigationReducer";

import authSaga from '../sagas/authSaga';
import investigationSaga from '../sagas/investigationSaga';

export const rootReducer = combineReducers({
	auth 	: authReducer,
	rest	: restReducer,
	service : investigationReducer,
});

export function* rootSaga() {
  yield all([ 
	  authSaga(),
	  investigationSaga()
  	]);
}
