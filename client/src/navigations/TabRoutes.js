import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Settings/Settings';
import Devices from '../screens/Devices/Devices';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const BottomTab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <BottomTab.Navigator
      tabBar={tabsProps => <BottomTabBar {...tabsProps} />}
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#F88440',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          left: 0,
          right: 0,
          paddingBottom: 10,
          position: 'absolute',
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            color = focused ? '#F88440' : 'gray';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog';
          } else if (route.name === 'Devices') {
            iconName = focused ? 'lightbulb-o' : 'lightbulb-o';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Devices" component={Devices} />
      <BottomTab.Screen name="Profile" component={Profile} />
      <BottomTab.Screen name="Settings" component={Settings} />
    </BottomTab.Navigator>
  );
};

export default TabRoutes;
