import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {deviceReducer} from './reducers/deviceReducer';
import {stackReducer} from './reducers/stackRerucer';

const reducer = combineReducers({
  devices: deviceReducer,
  auth: authReducer,
  screen: stackReducer,
});

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
