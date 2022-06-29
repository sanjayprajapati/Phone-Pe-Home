import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const NextBtn = ({title, action}) => {
  return (
    <TouchableOpacity style={styles.btnStyle} onPress={action}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default NextBtn;

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    padding: 10,
    backgroundColor: '#272a3b',
    position: 'absolute',
    bottom: -20,
    zIndex: 999,
  },
  title: {
    color: '#79c142',
    fontSize: 16,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
});
