import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const NextBtn = ({title, action}) => {
  return (
    <TouchableOpacity
      style={styles.btnStyle}
      onPress={action}
      activeOpacity={0.7}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default NextBtn;

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    padding: 15,
    backgroundColor: '#272a3b',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  title: {
    color: '#79c142',
    fontSize: 16,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
});
