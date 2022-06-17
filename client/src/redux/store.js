import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {deviceReducer} from './reducers/deviceReducer';

const reducer = combineReducers({
  devices: deviceReducer,
  auth: authReducer,
});

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
