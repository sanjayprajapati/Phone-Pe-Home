import {
  GET_ALL_DEVICES_RQUEQUEST,
  GET_ALL_DEVICES_SUCCESS,
  GET_ALL_DEVICES_FAIL,
} from '../constants/deviceConstans';
import {getDevices} from '../../utils/devices';

export const getAllDevices = () => async dispatch => {
  try {
    dispatch({type: GET_ALL_DEVICES_RQUEQUEST});
    //console.log(data.token);
    const data = await getDevices();
    dispatch({type: GET_ALL_DEVICES_SUCCESS, payload: data});
  } catch (error) {
    console.log(error);
    dispatch({type: GET_ALL_DEVICES_FAIL, payload: 'Unknown Error'});
  }
};
