import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Boxes from '../../components/Boxes';
import Header from '../../components/Header';
import {logout} from '../../redux/actions/authAction';
import MainLayourt from '../Layouts/MainLayout';

const Home = () => {
  const dispatch = useDispatch();

  const logoutUser = ({children}) => {
    dispatch(logout());
  };

  useEffect(() => {}, [dispatch]);

  return (
    <MainLayourt title="Home">
      <View style={styles.container}>
        <Boxes roomName="Living Room" deviceName="Light Bulb" />
        <Boxes roomName="Guest Room" deviceName="Fan" />
        <Boxes roomName="Bath Room" deviceName="Geaser" />
        <Boxes roomName="Master Bedroom" deviceName="AC" />
      </View>
    </MainLayourt>
  );
};

export default Home;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
