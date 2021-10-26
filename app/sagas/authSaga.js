import { put, call, takeEvery, takeLatest, select, delay } from 'redux-saga/effects';

import { AUTH, restAction, API_CONTS, RESTHELPER_RESET, RESTHELPER_VALUE } from "../actions/constant";
import { authUser, logout } from "../actions/authAction";

import { callAPI, updateAPIConfig } from '../api';
import { getData, storeData, removeData } from '../actions/constant';


import { createIconSet } from 'react-native-vector-icons';

export const getPage = state => state.nextPage;

export function* loginUser(action) {
  try {
    const restInit = {
      IS_LOADING: true,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something wrong",
    }
    yield put(restAction(restInit));

    const PostData = yield call(callAPI, API_CONTS.LOGIN, 'POST', action.payload);
    restInit.IS_LOADING = false;
    restInit.RETURN_MESSAGE = PostData.message;
    restInit.IS_RETURN = true;
    restInit.RETURN = PostData.return;

    if (PostData.return === false) {
      logoutData();
      yield put(logout());
    } else {
      const authUserInit = {
        userType: "caregiver",
        authToken: PostData.token,
        userAuthenticates: true,
        id: PostData.users.id,
        user: PostData.users
      }
      setUserData(authUserInit);
      yield put(authUser(authUserInit));
    }
    yield put(restAction(restInit));

  } catch (error) {
    yield put(restAction(
      {
        IS_LOADING: false,
        IS_RETURN: true,
        RETURN: false,
        RETURN_MESSAGE: "Network request failed"
      }));
  }
}

function* tokenUpdate(token) {
  yield put(update({
    device_type: "android",
    device_token: token
  }));
}

async function logoutData() {
  await storeData("userAuthenticates", "false");
  await removeData("userType");
  await removeData("authToken");
  await removeData("id");
  await removeData("user");
  await removeData("pic");
  updateAPIConfig("");
}


async function setUserData(authUserInit) {
  await storeData("userAuthenticates", authUserInit.userAuthenticates);
  await storeData("userType", authUserInit.userType);
  await storeData("authToken", authUserInit.authToken);
  await storeData("id", authUserInit.id);
  await storeData("user", JSON.stringify(authUserInit.user));
  updateAPIConfig(authUserInit.authToken);
  await storeData("pic", authUserInit.pic)
}


async function getUserToken() {
  const authToken = await getData("authToken");
  updateAPIConfig(authToken);
}



export function* updateUser(action) {
  try {
    const restInit = {
      IS_LOADING: false,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something wrong",
    }

    const PostData = yield call(callAPI, API_CONTS.UPDATEUSER, 'post', action.payload);
    if (PostData.return === true) {
      const authUserInit = {
        userType: PostData.users.usertype,
        authToken: PostData.token,
        userAuthenticates: true,
        id: PostData.users.id,
        user: PostData.users
      }
      setUserData(authUserInit);
      yield put(authUser(authUserInit));
    }
  } catch (error) {
    //
  }
}

export function* loginValid(action) {
  try {
    const restInit = {
      IS_LOADING: false,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something wrong",
    }
    getUserToken();
    yield put(restAction(restInit));
    yield delay(500);
    const PostData = yield call(callAPI, API_CONTS.LOGINVALID, 'get');
    if (PostData.return === false) {
      logoutData();
      yield put(logout());
    }
    else {
      const authUserInit = {
        userType: PostData.users.usertype,
        authToken: PostData.token,
        userAuthenticates: true,
        id: PostData.users.id,
        user: PostData.users
      }
      setUserData(authUserInit);
      yield put(authUser(authUserInit));
    }
  } catch (error) {
    //
  }
}


export function* logoutUser(action) {
  
  try {
    // yield put(setbooking({
    //   booking: []
    // }));
    yield put(restAction({
      IS_LOADING: true,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something wrong",
    }));
    // yield put(updateAPIConfig(""));
    yield delay(2500);
    logoutData();
    //yield put(logout());
    console.log("!")

    yield put(restAction({
      IS_LOADING: false,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something wrong",
    }));
  } catch (error) {
    //
  }
}


export default function* authSaga() {
  yield takeEvery(AUTH.LOGIN_USER, loginUser);
  yield takeEvery(AUTH.LOGOUT_USER, logoutUser);
  yield takeEvery(AUTH.UPDATE_USER, updateUser);
  yield takeEvery(AUTH.LOGIN_VALID, loginValid);
}
