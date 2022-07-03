import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import Octicons from 'react-native-vector-icons/Octicons';
import {useState} from 'react';

const DeviceSettings = ({navigation}) => {
  const [devices, setDevices] = useState([]);
  const gotoStepOne = () => {
    navigation.navigate('DeviceConfig');
  };
  return (
    <MainLayout>
      {!devices.length == 0 ? (
        <View style={styles.containerWithout}>
          <Octicons size={56} color="#f66" name="alert" />
          <Text style={styles.mainText}>No Device Added Yet !</Text>
          <Text style={styles.subText}>
            To add device click on + icon shown in the Screen
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <Text style={styles.subHead}>All Your Registered Devices</Text>
          </View>
          <Text style={styles.subText}>
            To add device click on + icon shown in the Screen
          </Text>
        </View>
      )}
      <Pressable style={styles.addBtn} onPress={gotoStepOne}>
        <Octicons size={22} color="#000" name="plus" />
      </Pressable>
    </MainLayout>
  );
};

export default DeviceSettings;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  containerWithout: {
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    paddingTop: 50,
  },
  container: {
    position: 'relative',
    height: '100%',
    paddingTop: 20,
  },
  mainText: {
    fontSize: 18,
    color: '#fff',
  },
  subText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
  },
  subHead: {
    paddingLeft: 20,
    color: '#79c142',
    marginBottom: 10,
    marginTop: 10,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#79c142',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 9,
  },
});
