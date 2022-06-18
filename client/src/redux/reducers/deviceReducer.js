import {
  GET_ALL_DEVICES_RQUEQUEST,
  GET_ALL_DEVICES_SUCCESS,
  GET_ALL_DEVICES_FAIL,
  CLEAR_ERRORS,
} from '../constants/deviceConstans';

export const deviceReducer = (state = {devices: []}, action) => {
  switch (action.type) {
    case GET_ALL_DEVICES_RQUEQUEST:
      return {
        loading: true,
        devices: [],
      };

    case GET_ALL_DEVICES_SUCCESS:
      return {
        loading: false,
        devices: action.payload,
      };

    case GET_ALL_DEVICES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
