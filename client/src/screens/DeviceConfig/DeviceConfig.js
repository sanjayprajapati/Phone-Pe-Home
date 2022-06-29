import {StyleSheet, Text, View, Pressable, Button} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Backbutton from '../../components/Backbutton';
import {CommonActions} from '@react-navigation/native';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import FinalStep from './FinalStep';

const Stack = createStackNavigator();

const DeviceConfig = ({navigation}) => {
  const previusScreen = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  const parentScreen = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StepOne"
        component={StepOne}
        options={{
          title: '1.Select Type of Device',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Backbutton goBack={parentScreen} titleInfo="Previus" />
          ),
        }}
      />
      <Stack.Screen
        name="StepTwo"
        component={StepTwo}
        options={{
          title: '2. Register Your Device',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Backbutton goBack={parentScreen} titleInfo="Previus" />
          ),
        }}
      />
      <Stack.Screen
        name="StepThree"
        component={StepThree}
        options={{
          title: '3. Connect to Device',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Backbutton goBack={parentScreen} titleInfo="Previus" />
          ),
        }}
      />
      <Stack.Screen
        name="StepFour"
        component={StepFour}
        options={{
          title: '4. Device Configuration',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Backbutton goBack={previusScreen} titleInfo="Previus" />
          ),
        }}
      />
      <Stack.Screen
        name="FinalStep"
        component={FinalStep}
        options={{
          title: '5. Name Your Device',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Backbutton goBack={previusScreen} titleInfo="Previus" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DeviceConfig;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: 300,
    height: 48,
    backgroundColor: '#272a3b',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5b96d8',
    fontFamily: 'Lato-Regular',
    textTransform: 'uppercase',
  },
});
