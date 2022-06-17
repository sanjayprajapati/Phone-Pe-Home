import {
  GET_ALL_DEVICES_RQUEQUEST,
  GET_ALL_DEVICES_SUCCESS,
  GET_ALL_DEVICES_FAIL,
} from '../constants/deviceConstans';

export const getAllDevices = data => async dispatch => {
  try {
    dispatch({type: GET_ALL_DEVICES_RQUEQUEST});
    //console.log(data.token);
    await setAuthAsyncStorage(data);
    dispatch({type: GET_ALL_DEVICES_SUCCESS, payload: data});
  } catch (error) {
    console.log(error);
    dispatch({type: GET_ALL_DEVICES_FAIL, payload: error.response.message});
  }
};
