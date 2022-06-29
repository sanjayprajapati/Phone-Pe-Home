import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CircleLoader from '../../components/CircleLoader';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Welcome from './Welcome';
const {height, width} = Dimensions.get('window');

const Stack = createStackNavigator();

const Home = ({navigation, route}) => {
  const [hasDevice, setHasDevice] = useState(false);

  //const {loading, devices} = useSelector(state => state.devices);

  useEffect(() => {}, []);

  return (
    <Stack.Navigator>
      {!hasDevice ? (
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: 'Welcome',
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
      ) : (
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{header: () => null}}
        />
      )}
    </Stack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  deviceContainer: {
    padding: 10,
    height: height - 150,
  },
  contentContainer: {
    paddingVertical: 0,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative',
  },
  mainHeading: {
    fontSize: 26,
    color: '#5b96d8',
  },
});
