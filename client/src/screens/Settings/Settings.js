import {StyleSheet, Text, View, Pressable, Button} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Backbutton from '../../components/Backbutton';
import AddDevice from './AddDevice';
import {CommonActions} from '@react-navigation/native';
import MainScreen from './MainScreen';
import HomeSettings from './HomeSettings';
import EditHome from './EditHome';
import RoomSettings from './RoomSettings';
import EditRoom from './EditRoom';

const Stack = createStackNavigator();

const Settings = ({navigation}) => {
  const previusScreen = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  const parentScreen = () => {
    navigation.goBack();
  };

  const Edit = event => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.mr}
        onPress={() => {
          navigation.navigate(event);
        }}>
        <Text style={styles.righttab}>Edit</Text>
      </TouchableOpacity>
    );
  };
  const Cancel = event => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.mr}
        onPress={() => {
          navigation.navigate(event);
        }}>
        <Text style={styles.righttab}>Cancel</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="HomeSettings"
        component={HomeSettings}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => Edit('EditHome'),
        }}
      />
      <Stack.Screen
        name="EditHome"
        component={EditHome}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => Cancel('HomeSettings'),
        }}
      />
      <Stack.Screen
        name="RoomSettings"
        component={RoomSettings}
        options={{
          title: 'Rooms',
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="EditRoom"
        component={EditRoom}
        options={({route}) => ({
          title: route.params.item.roomname,
          headerStyle: {
            backgroundColor: '#181b2c',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
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
  righttab: {
    backgroundColor: '#181b2c',
    color: '#5b96d8',
    fontSize: 14,
  },
  mr: {
    marginRight: 20,
  },
});
