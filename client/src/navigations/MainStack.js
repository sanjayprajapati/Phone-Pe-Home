import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import TabRoutes from './TabRoutes';
import StepOne from '../screens/Settings/StepOne';

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="StepOne"
        component={StepOne}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
