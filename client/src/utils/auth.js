import {client} from '../api/client';

const catchError = error => {
  if (error?.response?.data) {
    //console.log('>>>', error.response.data);
    return {success: false, error: error.response.data.message};
  } else {
    //console.log('===', error.response.data);
    return {success: false, error: error.response.data};
  }
};

export const signup = async values => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.post(`/user/signup`, values, config);
    //console.log('>>>>', data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const signin = async values => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.post(`/user/signin`, values, config);
    console.log(data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const forgetPassword = async values => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.post(`/user/forget-password`, values, config);
    console.log(data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const resetPassword = async values => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.put(`/user/reset-password`, values, config);
    console.log(data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updatePassword = async values => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.post(`/user/update-password`, values, config);
    console.log(data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const verifyotp = async (token, userId) => {
  try {
    //let token = token.toString();
    console.log(token);
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.post(
      `/user/verifyotp`,
      {token, userId},
      config,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
};
