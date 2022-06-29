import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import TabRoutes from './TabRoutes';

import DeviceConfig from '../screens/DeviceConfig/DeviceConfig';

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="DeviceConfig"
        component={DeviceConfig}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
