import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (KEYValue) => {
    try {
        let value = await AsyncStorage.getItem(KEYValue);
        if (value !== null) {
            return Promise.resolve(value)
        }
        return null;
    }
    catch (error) {
        return Promise.reject(error);
    }
}

const storeData = async (KEYValue, value) => {
    if (KEYValue === null) return false;
    try {
        await removeData(KEYValue);

        await AsyncStorage.setItem(KEYValue, (value).toString());
    } catch (e) {
        return Promise.reject(error);
    }
    return true;
}

const removeData = async (KEYValue) => {
    try {
        await AsyncStorage.removeItem(KEYValue)
    } catch (e) {
        console.log(e)
    }
    return true;
}

const API_CONTS = {
    SIGNUP: "signup",
    SIGNIN: "login",
    CATAGORY: "category/listing",
    PRODUCT: "product/listing",
    UPDATEPROFILE: "profile/update",
    ADDPRODUCT: "product/add",
    DELETEPRODUCT: "product/delete/",
    EDITPRODUCT: "product/edit/",
    SAVEORDER: "order/save",
    CHARGE: "charge",
    USERHISTORY: "user/order/listing/0",
    PRICELISTING: "price/listing"
}

const AUTH = {
    SET_STATUS: 'SET_AUTH_STATUS',
    REGISTER_USER: 'AUTH_REGISTER_USER',
    LOGIN_VALID: "SET_VALIDATELOGIN",
    LOGIN_USER: 'AUTH_LOGIN_USER',
    LOGOUT_USER: 'AUTH_LOGOUT_USER',
    USER: 'AUTH_USER_AUTH',
    USER_DATA: 'AUTH_USER_DATA',
    UPDATE_USER: "AUTH_USER_UPDATE",
    SIGNUP_USER: "AUTH_SIGNUP",
    GET_SIGNUP: "GET_SIGNUP",
    SET_SIGNUP: "SET_SIGNUP"
};

export {
    AUTH, API_CONTS, getData, storeData, removeData
};