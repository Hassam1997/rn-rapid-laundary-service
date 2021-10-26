import { FELIKS_SERVICES } from "./constant";

export const getservice = (payload)=>({
    type: FELIKS_SERVICES.GETSERVICES,
    payload
});

export const getservicebyid = (payload)=>({
    type: FELIKS_SERVICES.GETSERVICEBYID,
    payload
});

export const getservicedetailscomments = (payload)=>({
    type: FELIKS_SERVICES.GETSERVICEDETAILSCOMMENTS,
    payload
});

export const setcomments = (payload) =>({
    type: FELIKS_SERVICES.SET_COMMENTS,
    payload
});

export const setcurrentvalue = (payload) =>({
    type: FELIKS_SERVICES.SETCURRENT_VALUE,
    payload
});

export const setvalue = (payload) =>({
    type: FELIKS_SERVICES.SET_VALUE,
    payload
});