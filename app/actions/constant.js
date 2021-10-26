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

  }
  return true;
}

const removeData = async (KEYValue) => {
  try {
    await AsyncStorage.removeItem(KEYValue)
  } catch (e) {
    // remove error
  }
  return true;
}


const API_CONTS = {
  LOGIN: 'login/index.php',
  LOGINVALID: "loginvalid",
  SIGNUP: "signup/index.php",
  EMAILCHECK: "emailcheck",
  UPDATEUSER: "updateprofile",
  GETNOTIFICATION: "notifications",
  CHANGEPASSWORD: "changepassword",
  FORGOTEMAIL: "forgotemail",
  RESETPASSWORD: "resetpassword",
  //feliks
  SERVICES: "service/index.php",
  ADDSERVICE: "addServiceDetail/index.php",
  GETSERVICEBYID: "getServiceDetailByUserId/index.php",
  GETSERVICEDETAILSCOMMENTS: "getServiceDetailComment/index.php",
  ADDSERVICEDETAILCOMMENT : "addServiceDetailComment/index.php",
  UPDATEUSER : "updateUser/index.php"
}

// Auth
const AUTH = {
  SET_STATUS: 'SET_AUTH_STATUS',
  REGISTER_USER: 'AUTH_REGISTER_USER',
  LOGIN_VALID: "SET_VALIDATELOGIN",
  LOGIN_USER: 'AUTH_LOGIN_USER',
  LOGOUT_USER: 'AUTH_LOGOUT_USER',
  USER: 'AUTH_USER_AUTH',
  USER_DATA: 'AUTH_USER_DATA',
  UPDATE_USER: "AUTH_USER_UPDATE",
};


//FELIKS
const FELIKS_SERVICES = {
  GETSERVICES: 'SET_GETSERVICES',
  SETCURRENT_VALUE: 'SET_SETCURRENT_VALUE',
  GETSERVICEBYID: 'SET_GETSERVICEBYID',
  GETSERVICEDETAILSCOMMENTS : 'SET_GETSERVICEDETAILSCOMMENTS',
  SET_VALUE : "SET_VALUE",
  SET_COMMENTS : "SET_COMMENTS"
}

const RESTHELPER = "RESTHELPER";
const RESTHELPER_VALUE = "SET_RESTHELPERVALUE";
const RESTHELPER_RESET = "RESTHELPER_RESET";

export {
  API_CONTS, RESTHELPER_VALUE, RESTHELPER, RESTHELPER_RESET,
  AUTH,FELIKS_SERVICES, getData, storeData, removeData
};

export const restAction = payload => ({
  type: RESTHELPER,
  payload
});

export const restActionValue = payload => ({
  type: RESTHELPER_VALUE,
  payload
});

export const RESTHELPERRESET = () => ({
  type: RESTHELPER_RESET
});




