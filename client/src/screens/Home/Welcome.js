import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import MainLayout from '../Layouts/MainLayout';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {addDevice} from '../../redux/actions/stackAction';

const Welcome = ({navigation}) => {
  const dispatch = useDispatch();
  const stackManeger = () => {
    // console.log('sdfsdf');
    // let screen = 'Settings';
    // dispatch(addDevice(screen));
    navigation.navigate('Settings', {screen: 'AddDevice'});
  };
  useEffect(() => {}, []);
  return (
    <MainLayout title="Sweet Home">
      <View style={styles.container}>
        <View style={styles.welocomeContainer}>
          <Text style={styles.welcomeHeading}>Welocome, </Text>
          <Text style={styles.mainHeading}>Jhon Doe ! </Text>
          <Text style={styles.subText}>No Device Added Yet</Text>
          <Pressable style={styles.buttonContainer} onPress={stackManeger}>
            <Text style={styles.buttonText}>Add Device</Text>
            <Entypo size={22} color="#fff" name="plus" />
          </Pressable>
        </View>
      </View>
    </MainLayout>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  welocomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  welcomeHeading: {
    fontSize: 26,
    color: '#fff',
  },
  mainHeading: {
    fontSize: 28,
    color: '#5b96d8',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
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
});
