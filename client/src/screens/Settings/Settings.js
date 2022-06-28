import {StyleSheet, Text, View, Pressable, Button} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Backbutton from '../../components/Backbutton';
import AddDevice from './AddDevice';
import {CommonActions} from '@react-navigation/native';
import ConfigureDevieStepOne from './ConfigureDevieStepOne';
import ConfigureDeviceStepTwo from './ConfigureDeviceStepTwo';
import ConfigureDeviceStepThree from './ConfigureDeviceStepThree';

const Stack = createStackNavigator();

const Settings = ({navigation}) => {
  const previusScreen = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  const parentScreen = () => {
    navigation.navigate('Settings');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddDevice"
        component={AddDevice}
        options={{
          title: 'Devices',
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
        name="ConfigureDeviceStepOne"
        component={ConfigureDevieStepOne}
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
            <Backbutton goBack={previusScreen} titleInfo="Previus" />
          ),
        }}
      />
      <Stack.Screen
        name="ConfigureDeviceStepTwo"
        component={ConfigureDeviceStepTwo}
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
            <Backbutton goBack={previusScreen} titleInfo="Previus" />
          ),
        }}
      />
      <Stack.Screen
        name="ConfigureDeviceStepThree"
        component={ConfigureDeviceStepThree}
        options={{
          title: '3. Configure Your Device',
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

export default Settings;

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
