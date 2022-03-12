import { RESTHELPER, RESTHELPER_RESET, RESTHELPER_VALUE } from "../../actions/rest/constants";

const initialState = {
    IS_LOADING: false,
    IS_RETURN: false,
    RETURN: false,
    RETURN_TITLE: "Error:",
    RETURN_MESSAGE: ""
};

export const restReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESTHELPER:
            const newState = {
                IS_LOADING: action.payload.IS_LOADING,
                IS_RETURN: action.payload.IS_RETURN,
                RETURN: action.payload.RETURN,
                RETURN_MESSAGE: (action.payload.RETURN_MESSAGE) ? action.payload.RETURN_MESSAGE : initialState.RETURN_MESSAGE
            };
            return newState;

        case RESTHELPER_RESET:
            return initialState;

        case RESTHELPER_VALUE:
            return initialState;
        default:
            return state;
    }
};