import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

const CircleLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#5b96d8" />
    </View>
  );
};

export default CircleLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
