export const BASE_URL = 'https://app.feliksinvestigationsgroupfl.com/';
import { getData } from '../actions/constant';

let config = {
   access_token: null,
};

export const getAPIConfig = () => ({ ...config });

export const updateAPIConfig = access_token => {
   config = {
      ...config,
      access_token: "Bearer " + access_token
   };
};


export const callAPI = async (endpoint, method = 'get', formData, header = { Accept: "multipart/form-data" }) => {
  const userAuthenticates = await getData("userAuthenticates");
  const authToken = await getData("authToken");
   const headerOptions = {
      method: method,
      headers: {
         Accept: 'multipart/form-data',
         'Content-Type': 'multipart/form-data',
         'Authorization': 'Bearer ' + authToken,
         ...header
      },
   }
   if (formData !== null) {
      headerOptions.body = formData
   }
   return fetch(`${BASE_URL}${endpoint}`, headerOptions)
      .then((response) =>
         response.json())
      .then((json) => {
         return json;
      })
      .catch((error) => {
         console.error(error);
      });
};


export const uploadMediaAPI = (endpoint, method = 'get', data) => {
   const headerOptions = {
      method: method,
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'multipart/form-data',
         'Authorization': getAPIConfig().access_token
      },
      body: data
   }
   console.log(headerOptions)
   return fetch(`${BASE_URL}${endpoint}`, headerOptions)
      .then((response) => response.json())
      .then((json) => {
         console.log(json)
         return json;
      })
      .catch((error) => {
         console.error(error);
      });
};

