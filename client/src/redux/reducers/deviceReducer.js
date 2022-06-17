import {
  GET_ALL_DEVICES_RQUEQUEST,
  GET_ALL_DEVICES_SUCCESS,
  GET_ALL_DEVICES_FAIL,
} from '../constants/deviceConstans';

export const userReducer = (state = {devices: []}, action) => {
  switch (action.type) {
    case GET_ALL_DEVICES_RQUEQUEST:

    case LOAD_USER_REQUEST:
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
