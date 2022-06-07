import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import TabRoutes from './TabRoutes';

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabRoutes} />
    </Stack.Navigator>
  );
};

export default MainStack;
