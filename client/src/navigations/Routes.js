import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default function Routes() {
  const [userData, setUserData] = useState(false);

  console.log('user data', userData);

  return (
    <NavigationContainer>
      {userData == true ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
