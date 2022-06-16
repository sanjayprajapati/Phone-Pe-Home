import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGGED_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from '../constants/userConstants';
import {
  resetAuthAsyncStorage,
  setAuthAsyncStorage,
} from '../../utils/getAuthAsyncStorage';
import {client} from '../../api/client';

// Regist user
export const RegisterUser = data => async dispatch => {
  try {
    //dispatch({type: LOGIN_REQUEST});
    console.log(data.token);
    await setAuthAsyncStorage(data);
    dispatch({type: REGISTER_USER_SUCCESS, payload: data});
  } catch (error) {
    console.log(error);
    dispatch({type: REGISTER_USER_FAIL, payload: error.response.message});
  }
};
// Login
export const loginUser = data => async dispatch => {
  try {
    dispatch({type: LOGIN_REQUEST});
    console.log(data.token);
    await setAuthAsyncStorage(data);
    dispatch({type: LOGIN_SUCCESS, payload: data});
  } catch (error) {
    console.log(error);
    dispatch({type: LOGIN_FAIL, payload: error.response.message});
  }
};

// Load User
export const loadUser = () => async dispatch => {
  try {
    //dispatch({type: LOAD_USER_REQUEST});

    await resetAuthAsyncStorage();

    dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message});
  }
};
// Logout User
export const logout = () => async dispatch => {
  try {
    dispatch({type: LOGOUT_REQUEST});
    await resetAuthAsyncStorage();
    await client.get(`/user/logout`);

    dispatch({type: LOGOUT_SUCCESS});
  } catch (error) {
    dispatch({type: LOGOUT_FAIL, payload: error.response.data.message});
  }
};

export const loggedUser = data => ({
  type: LOGGED_USER,
  payload: data,
});
