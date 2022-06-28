import {
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS,
} from '../constants/switchingStack';

export const stackReducer = (
  state = {screen: ['Home', 'Devices', 'Profile', 'Settings']},
  action,
) => {
  switch (action.type) {
    case ADD_DEVICE_REQUEST:
      return {
        isLoading: true,
        screen: 'Home',
      };
    case ADD_DEVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        screen: action.payload,
      };

    default:
      return state;
  }
};
