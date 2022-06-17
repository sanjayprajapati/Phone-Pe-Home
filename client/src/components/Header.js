import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({title}) => {
  return (
    <View style={styles.Header}>
      <Text style={styles.headding}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#181b2c',
    height: 80,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  headding: {
    fontSize: 22,
    color: '#fff',
  },
});
