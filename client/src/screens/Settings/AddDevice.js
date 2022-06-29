import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import Octicons from 'react-native-vector-icons/Octicons';

const AddDevice = ({navigation}) => {
  const gotoStepOne = () => {
    navigation.navigate('DeviceConfig');
  };
  return (
    <MainLayout>
      <View style={styles.container}>
        <Octicons size={56} color="#f66" name="alert" />
        <Text style={styles.mainText}>No Device Added Yet !</Text>
        <Text style={styles.subText}>
          To add device click on + icon shown in the Screen
        </Text>
        <Pressable style={styles.addBtn} onPress={gotoStepOne}>
          <Octicons size={22} color="#000" name="plus" />
        </Pressable>
      </View>
    </MainLayout>
  );
};

export default AddDevice;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    height: '80%',
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
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#79c142',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
