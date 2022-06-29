import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import Loader from '../components/Loader';
import {useSelector, useDispatch} from 'react-redux';
import {loadUser} from '../redux/actions/userAction';
import TabRoutes from './TabRoutes';

const Stack = createStackNavigator();

export default function Routes() {
  const dispatch = useDispatch();
  let userData = false;

  useEffect(() => {
    //dispatch(loadUser());
  }, [dispatch]);

  const {loading, isAuthenticated, auth} = useSelector(state => state.auth);
  // let userToken = auth.token ? auth.token : '';
  console.log('is authenticate:', isAuthenticated);

  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
