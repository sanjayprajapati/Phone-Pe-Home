import {
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS,
} from '../constants/switchingStack';

export const addDevice = data => async dispatch => {
  try {
    //dispatch({type: LOGIN_REQUEST});
    console.log(data);

    dispatch({type: ADD_DEVICE_SUCCESS, payload: data});
  } catch (error) {
    console.log(error);
  }
};
