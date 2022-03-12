import { put, call, takeEvery, takeLatest, select, delay } from 'redux-saga/effects';
import { channel } from 'redux-saga'
import { restAction, restActionValue } from '../../actions/rest/restAction';
import { API_CONTS } from '../../actions/auth/constants';
import { getprice } from '../../actions/product/productAction';
import { callAPI } from '../../api';
import { PRODUCT_CATAGORY } from '../../actions/product/constant';

const FileChannel = channel()

// export function* getcatagoryFunc(action) {
//     try {
//         let initialArr;
//         const stateIinit = {
//             catagory: []
//         }
//         const PostData = yield call(callAPI, API_CONTS.CATAGORY, 'GET');
//         if (PostData.success === true) {
//             stateIinit.catagory = PostData.categories
//         }
//         yield put(getcatagory(stateIinit));


//     } catch (error) {

//     }
// }

// export function* getproductFunc(action) {
//     try {
//         // yield put(restAction({
//         //     IS_LOADING: true,
//         // }));
//         const stateIinit = {
//             product: []
//         }
//         // const PostData = yield call(callAPI, API_CONTS.PRODUCT, 'GET');
//         // if (PostData.success === true) {
//         //     stateIinit.product = PostData.products
//         // }
//         const postsData = yield callAPI(API_CONTS.PRODUCT, "GET").then(res => {
//             if (res.success === true) {
//                 stateIinit.product = res.products
//                 // FileChannel.put(restAction({
//                 //     IS_LOADING: false,
//                 // }));
//             }
//         })
//         yield put(getproduct(stateIinit));

//         // yield put(restAction({
//         //     IS_LOADING: false,
//         // }));
//         // const channel = yield take(FileChannel)
//         // yield put(channel)

//     } catch (error) {
//         yield put(restAction({
//             IS_LOADING: false,
//             RETURN: false,
//             IS_RETURN: true,
//             RETURN_MESSAGE: `Network error, reload your app or check internet connection`,
//         }));
//     }
// }

// export function* gethistoryFunc(action) {
//     try {
//         const stateIinit = {
//             history: []
//         }
//         const PostData = yield call(callAPI, API_CONTS.USERHISTORY, 'POST');
//         if (PostData.success === true) {
//             stateIinit.history = PostData.orders
//         }
//         yield put(gethistory(stateIinit));

//     } catch (error) {

//     }
// }

export function* getpricelistingFunc(action) {
    try {
        const stateIinit = {
            pricelisting: []
        }
        const PostData = yield call(callAPI, API_CONTS.PRICELISTING, 'GET');
        if (PostData.success === true) {
            stateIinit.pricelisting = PostData.prices
        }
        yield put(getprice(stateIinit));
        
    } catch (error) {
        console.log("Saga Error", error)
    }
}

export default function* investigationSaga() {
    // yield takeEvery(PRODUCT_CATAGORY.GETCATAGORY, getcatagoryFunc);
    // yield takeEvery(PRODUCT_CATAGORY.GETPRODUCT, getproductFunc);
    // yield takeEvery(PRODUCT_CATAGORY.GET_HISTORY, gethistoryFunc);
    yield takeEvery(PRODUCT_CATAGORY.GET_PRICELISTING, getpricelistingFunc);
}
