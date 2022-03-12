import { channel } from 'redux-saga'
import { put, call, takeEvery, takeLatest, select, delay, take } from 'redux-saga/effects';
import { AUTH, API_CONTS, storeData, getData, removeData } from '../../actions/auth/constants';
import { callAPI } from '../../api';
import { setsignup, authUser } from '../../actions/auth/authAction';
import { restAction, restActionValue } from '../../actions/rest/restAction';

const FileChannel = channel()

export function* signupFunction(action) {
    console.log(action)
    try {
        var loopBreak = false;
        for (var key in action.payload) {
            if (action.payload[key] === "") {
                loopBreak = true
                yield put(restAction({
                    IS_LOADING: false,
                    RETURN: false,
                    IS_RETURN: true,
                    RETURN_MESSAGE: `${key}` + " Field is Empty",
                }));
                break;
            }
        }
        if (loopBreak == false) {
            let data = new FormData();
            yield put(restAction({
                IS_LOADING: true,
                RETURN: false,
                IS_RETURN: false,
                RETURN_MESSAGE: "Something",
            }));
            data.append("username", action.payload.username)
            data.append("password", action.payload.password)
            data.append("firstname", action.payload.firstname)
            data.append("lastname", action.payload.lastname)
            data.append("mobile", action.payload.number)
            data.append("address", action.payload.address)
            const postsData = yield callAPI(API_CONTS.SIGNUP, "POST", data).then(res => {
                console.log(res)
                if (res.success === true) { 
                    removeUserData()
                    const authUserInit = {
                        authToken: res.accessToken,
                        userAuthenticates: true,
                        id: res.user.signup_id,
                        user: res.user,
                    }
                    setUserData(authUserInit);
                    FileChannel.put(authUser(authUserInit));
                } else {
                    FileChannel.put(restAction({
                        IS_LOADING: false,
                        RETURN: res.success,
                        IS_RETURN: true,
                        RETURN_MESSAGE: res.responseDescription,
                    }));
                }
            })
            yield put(restAction({
                IS_LOADING: false,
                RETURN: false,
                IS_RETURN: false,
                RETURN_MESSAGE: "Something",
            }));
        }
        const channel = yield take(FileChannel)
        yield put(channel)
    } catch (err) {
        yield put(restAction({
            IS_LOADING: false,
            RETURN: false,
            IS_RETURN: true,
            RETURN_MESSAGE: `${err}`,
        }));
    }
}

export function* signinFunction(action) {
    try {
        var loopBreak = false;
        for (var key in action.payload) {
            if (action.payload[key] === "") {
                loopBreak = true
                yield put(restAction({
                    IS_LOADING: false,
                    RETURN: false,
                    IS_RETURN: true,
                    RETURN_MESSAGE: `${key}` + " Field is Empty",
                }));
                break;
            }
        }
        if (loopBreak == false) {
            let data = new FormData();
            yield put(restAction({
                IS_LOADING: true,
                RETURN: false,
                IS_RETURN: false,
                RETURN_MESSAGE: "Something",
            }));
            data.append("username", action.payload.email)
            data.append("password", action.payload.password)
            data.append("type", action.payload.type)
            data.append("grantType", action.payload.grantType)
            const postsData = yield callAPI(API_CONTS.SIGNIN, "POST", data).then(res => {
                if (res.success === true) {
                    const authUserInit = {
                        userType: res.user.signup_user,
                        authToken: res.accessToken,
                        userAuthenticates: true,
                        id: res.user.signup_id,
                        user: res.user,
                    }
                    setUserData(authUserInit);
                    FileChannel.put(authUser(authUserInit));
                } else {
                    FileChannel.put(restAction({
                        IS_LOADING: false,
                        RETURN: res.success,
                        IS_RETURN: true,
                        RETURN_MESSAGE: res.responseDescription,
                    }));
                }
            })
            yield put(restAction({
                IS_LOADING: false,
                RETURN: false,
                IS_RETURN: false,
                RETURN_MESSAGE: "Something",
            }));
        }
        const channel = yield take(FileChannel)
        yield put(channel)
    } catch (err) {
        yield put(restAction({
            IS_LOADING: false,
            RETURN: false,
            IS_RETURN: true,
            RETURN_MESSAGE: `${err}`,
        }));
    }
}

export function* logoutUser(action) {
    try {
        logoutData();
    } catch (error) {
    }
}

async function setUserData(authUserInit) {
    await storeData("userAuthenticates", authUserInit.userAuthenticates);
    await storeData("authToken", authUserInit.authToken);
    await storeData("id", authUserInit.id);
    await storeData("user", JSON.stringify(authUserInit.user));
}

async function logoutData() {
    await storeData("userAuthenticates", "false");
    await removeData("userType");
    await removeData("authToken");
    await removeData("id");
    await removeData("user");
    await removeData("pic");
}

async function removeUserData() {
    await removeData("@firstName");
    await removeData("@lastName");
    await removeData("@phone");
    await removeData("@email");
    await removeData("@password");
}


export default function* authSaga() {
    yield takeEvery(AUTH.GET_SIGNUP, signupFunction);
    yield takeEvery(AUTH.LOGIN_USER, signinFunction);
    yield takeEvery(AUTH.LOGOUT_USER, logoutUser);
}