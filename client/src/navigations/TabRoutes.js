import React, {useEffect} from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Settings/Settings';
import Devices from '../screens/Devices/Devices';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addDevice} from '../redux/actions/stackAction';

const BottomTab = createBottomTabNavigator();

const TabRoutes = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {isLoading, screen} = useSelector(state => state.screen);

  useEffect(() => {}, []);
  return (
    <BottomTab.Navigator
      tabBar={tabsProps => <BottomTabBar {...tabsProps} />}
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#5b96d8',
        tabBarInactiveTintColor: '#81848d',
        tabBarStyle: {
          backgroundColor: '#181b2c',
          height: 60,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopWidth: 0,
          left: 0,
          right: 0,
          paddingBottom: 10,
          borderWidth: 1,
          borderColor: '#181b2c',
        },

        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            color = focused ? '#5b96d8' : '#81848d';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog';
          } else if (route.name === 'Devices') {
            iconName = focused ? 'md-cube-sharp' : 'md-cube-sharp';
            return <Ionicons name={iconName} size={size} color={color} />;
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{header: () => null}}
      />
      <BottomTab.Screen
        name="Devices"
        component={Devices}
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
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
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
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </BottomTab.Navigator>
  );
};

export default TabRoutes;
