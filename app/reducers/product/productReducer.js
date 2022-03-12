import { PRODUCT_CATAGORY } from "../../actions/product/constant";

const initialAuthState = {
    catagory: [],
    product: [],
    history: [],
    pricelisting: []
};

export const productReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case PRODUCT_CATAGORY.GETCATAGORY: {
            return {
                ...state,
                catagory: (action.payload.catagory) ?? state.catagory,
            };
        }
        case PRODUCT_CATAGORY.GETPRODUCT: {
            return {
                ...state,
                product: (action.payload.product) ?? state.product,
            };
        }
        case PRODUCT_CATAGORY.GET_HISTORY: {
            return {
                ...state,
                history: (action.payload.history) ?? state.history,
            };
        }
        case PRODUCT_CATAGORY.GET_PRICELISTING: {
            return {
                ...state,
                pricelisting: (action.payload.pricelisting) ?? state.pricelisting
            }
        }
        default:
            return state;
    }
};