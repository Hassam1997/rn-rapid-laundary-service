import { RESTHELPER, RESTHELPER_VALUE, RESTHELPER_RESET } from "../rest/constants";

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