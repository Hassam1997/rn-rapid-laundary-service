import { put, call, takeEvery, takeLatest, select, delay } from 'redux-saga/effects';

import { FELIKS_SERVICES, API_CONTS, restAction } from "../actions/constant";
import { setcurrentvalue, setvalue, setcomments } from "../actions/investigationActions";

import { callAPI } from '../api';

export const getPage = state => state.nextPage;


export function* getservicesFunc(action) {
  try {
    yield put(restAction({
      IS_LOADING: true,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something",
    }));
    const stateIinit = {
      services: []
    }
    const PostData = yield call(callAPI, API_CONTS.SERVICES, 'post');
    if (PostData.success === true) {
      stateIinit.services = PostData.dataArray
    }
    yield put(setcurrentvalue(stateIinit));

    yield put(restAction({
      IS_LOADING: false,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something wrong",
    }));

  } catch (error) {

  }
}

export function* getservicesbyidFunc(action) {
  try {
    yield put(restAction({
      IS_LOADING: true,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something",
    }));
    const stateIinit = {
      servicesbyid: []
    }
    const PostData = yield call(callAPI, API_CONTS.GETSERVICEBYID, 'post');
    if (PostData.success === true) {
      stateIinit.servicesbyid = PostData.dataArray,
        console.log("saga")
    }

    yield put(setvalue(stateIinit));
    yield put(restAction({
      IS_LOADING: false,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something wrong",
    }));
  } catch (error) {

  }
}


export function* getservicescommentsFunc(action) {
  try {
    let data = new FormData();
    yield put(restAction({
      IS_LOADING: true,
      RETURN: false,
      IS_RETURN: false,
      RETURN_MESSAGE: "Something",
    }));
    console.log("action", action.payload.name.service_detail_id)
    const stateIinit = {
      comments: []
    }
    data.append("service_detail_id", action.payload.name.service_detail_id)
    const PostData = yield call(callAPI, API_CONTS.GETSERVICEDETAILSCOMMENTS, 'post', data);
    if (PostData.response === 200) {
      stateIinit.comments = PostData.dataArray
      yield put(setcomments(stateIinit));
    }
    else {
      stateIinit.comments = [];
    }

    yield put(setcomments(stateIinit));

  } catch (error) {

  }
  yield put(restAction({
    IS_LOADING: false,
    RETURN: false,
    IS_RETURN: false,
    RETURN_MESSAGE: "Something wrong",
  }));
}

// export function* getsinglevehiclesFunc(action) {
//     try {
//         yield put(restAction({
//             IS_LOADING: true,
//             RETURN: false,
//             IS_RETURN: false,
//             RETURN_MESSAGE: "Something wrong",
//           }));
//           console.log( action)
//           const stateIinit = {
//             currentvehicle : []
//           }
//             const PostData = yield call(callAPI, API_CONTS.VEHICLE + "/" + action.payload.Id  , 'get'  );
//             if ( PostData.return === true ) {
//                 stateIinit.currentvehicle = PostData.posts
//             }

//           yield put(setcarrentvalue( stateIinit ));

//         yield put(restAction({
//             IS_LOADING: false,
//             RETURN: false,
//             IS_RETURN: false,
//             RETURN_MESSAGE: "Something wrong",
//           }));

//     } catch (error) {

//     }
// }


// export function* getbookingsFunc(action) {
//     try {
//         yield put(restAction({
//             IS_LOADING: true,
//             RETURN: false,
//             IS_RETURN: false,
//             RETURN_MESSAGE: "Something wrong",
//           }));
//           const stateIinit = {
//             bookings : []
//           }
//             const PostData = yield call(callAPI, API_CONTS.BOOKINGS , 'get'  );
//             if ( PostData.return === true ) {
//                 stateIinit.bookings = PostData.posts
//             }

//           yield put(setcarrentvalue( stateIinit ));

//         yield put(restAction({
//             IS_LOADING: false,
//             RETURN: false,
//             IS_RETURN: false,
//             RETURN_MESSAGE: "Something wrong",
//           }));

//     } catch (error) {

//     }
// }


export default function* investigationSaga() {
  yield takeEvery(FELIKS_SERVICES.GETSERVICES, getservicesFunc);
  yield takeEvery(FELIKS_SERVICES.GETSERVICEBYID, getservicesbyidFunc);
  yield takeEvery(FELIKS_SERVICES.GETSERVICEDETAILSCOMMENTS, getservicescommentsFunc);
}
