import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListDevices from '../../components/devices/ListDevices';
import Header from '../../components/Header';
import {logout} from '../../redux/actions/authAction';
import MainLayout from '../Layouts/MainLayout';
import CardDevice from '../../components/devices/CardDevice';
import {getAllDevices} from '../../redux/actions/deviceAction';

const Home = () => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  const {loading, devices} = useSelector(state => state.devices);
  const [item, setItem] = useState(null);

  useEffect(() => {
    dispatch(getAllDevices());
    setItem(false);
    console.log(loading);
  }, []);
  const handleDeviceState = id => {
    let newItem = item.find(index => {
      return index._id === id;
    });
    console.log(newItem);
    setItem(
      item.map(elem => {
        if (elem._id === newItem._id) {
          if (newItem.state === 'ON') {
            return {...elem, state: 'OFF'};
          } else {
            return {...elem, state: 'ON'};
          }
        }
        return elem;
      }),
    );
    console.log(item);
  };

  return (
    <MainLayout title="Home">
      <View style={styles.container}>
        <View style={styles.deviceContainer}>
          <Text style={styles.mainHeading}>My Devices</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
              {devices &&
                devices.map(elem => (
                  <CardDevice
                    key={elem._id}
                    data={elem}
                    devicename={elem.name}
                    roomType={elem.roomType}
                    deviceState={elem.state}
                    deviceType={elem.deviceType}
                    changeState={() => handleDeviceState(elem._id)}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </MainLayout>
  );
};

export default Home;

const {height, width} = Dimensions.get('window');

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
  },
  mainHeading: {
    fontSize: 26,
    color: '#5b96d8',
  },
});
