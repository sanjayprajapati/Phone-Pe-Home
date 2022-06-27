import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {Fragment} from 'react';
const {width, height} = Dimensions.get('window');

const CircleLoader = () => {
  return (
    <Fragment>
      <View style={styles.overlay}></View>
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#5b96d8" />
      </View>
    </Fragment>
  );
};

export default CircleLoader;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    opacity: 0.3,
    zIndex: 9,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',

    zIndex: 10,
    borderRadius: 20,
  },
  innerOverlay: {
    width: (width - 40) / 2,
    height: (width - 40) / 1.5,
    borderRadius: 20,
    backgroundColor: '#272a3b',
    opacity: 0.5,
    zIndex: 8,
    position: 'absolute',
    left: 0,
  },
});
