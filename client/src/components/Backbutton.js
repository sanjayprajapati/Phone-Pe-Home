import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Backbutton = ({goBack, titleInfo}) => {
  return (
    <Pressable style={styles.backbtn} onPress={goBack}>
      <Ionicons size={26} color="#5b96d8" name="arrow-back" />
    </Pressable>
  );
};

export default Backbutton;

const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 10,
  },
});
