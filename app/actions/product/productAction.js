import { PRODUCT_CATAGORY } from "./constant";

export const getcatagory = payload => ({
    type: PRODUCT_CATAGORY.GETCATAGORY,
    payload
});

export const getproduct = payload => ({
    type: PRODUCT_CATAGORY.GETPRODUCT,
    payload
});

export const gethistory = payload => ({
    type: PRODUCT_CATAGORY.GET_HISTORY,
    payload
});

export const getprice = payload => ({
    type: PRODUCT_CATAGORY.GET_PRICELISTING,
    payload
});