import { FELIKS_SERVICES } from "../actions/constant";

const initialAuthState = {
    services: [],
    servicesbyid: [],
    comments: [],
};

export const investigationReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case FELIKS_SERVICES.SETCURRENT_VALUE: {
            return {
                ...state,
                services: (action.payload.services) ?? state.services,
                servicesbyid: (action.payload.servicesbyid) ?? state.servicesbyid,
                comments: (action.payload.comments) ?? state.comments,
            };
        }
        case FELIKS_SERVICES.SET_VALUE: {
            return {
                ...state,
                servicesbyid: (action.payload.servicesbyid.reverse()) ?? state.servicesbyid.reverse(),
            };
        }
        case FELIKS_SERVICES.SET_COMMENTS: {
            return {
                ...state,
                comments: (action.payload.comments.reverse()) ?? state.comments.reverse(),
            };
        }
        default:
            return state;
    }
};