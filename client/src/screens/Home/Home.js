import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/authAction';
import MainLayourt from '../Layouts/MainLayout';

const Home = () => {
  const dispatch = useDispatch();

  const logoutUser = ({children}) => {
    dispatch(logout());
  };

  useEffect(() => {}, [dispatch]);

  return (
    <MainLayourt>
      <View>
        <TouchableOpacity onPress={logoutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </MainLayourt>
  );
};

export default Home;
