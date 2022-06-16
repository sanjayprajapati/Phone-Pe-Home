import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from '../screens/Onboarding/Onboarding';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import VerifyOtp from '../screens/Verifications/VerifyOtp';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import ResetPassword from '../screens/ForgotPassword/ResetPassword';
import {Dimensions} from 'react-native';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{header: () => null}}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Forgot Password',
            headerStyle: {
              backgroundColor: '#fff',
              height: 60,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'normal',
              width: '100%',
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: 'Reset Password',
            headerStyle: {
              backgroundColor: '#fff',
              height: 60,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'normal',
              width: '100%',
              fontSize: 24,
            },
          }}
        />

        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{header: () => null}}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Forgot Password',
            headerStyle: {
              backgroundColor: '#fff',
              height: 60,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'normal',
              width: '100%',
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: 'Reset Password',
            headerStyle: {
              backgroundColor: '#fff',
              height: 60,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'normal',
              width: '100%',
              fontSize: 24,
            },
          }}
        />

        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    );
  }
};
export default AuthStack;
