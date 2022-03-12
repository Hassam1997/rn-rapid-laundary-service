import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import { authReducer }  from "../reducers/auth/authReducer";
import { restReducer }  from "../reducers/rest/restReducer";
import { productReducer } from "../reducers/product/productReducer";
import cartItems from "../reducers/product/cartItem";
import myCartItem from "../reducers/product/myCartItem";

import authSaga from "../sagas/auth/authSaga";
import productSaga from "../sagas/product/productSaga";


export const rootReducer = combineReducers({
	auth 	   : authReducer,
	rest	   : restReducer,
	product    : productReducer,
	cartItem   : cartItems,
	mycartitem : myCartItem
});

export function* rootSaga() {
  yield all([ 
	  authSaga(),
	  productSaga()
  	]);
}
