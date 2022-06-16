import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {userReducer} from './reducers/userReducer';

const reducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
