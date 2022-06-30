import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {Fragment} from 'react';

const InnerLoader = () => {
  return (
    <Fragment>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          zIndex: 98,
          backgroundColor: '#181b2c',
          opacity: 0.5,
        }}></View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: 99,
        }}>
        <ActivityIndicator size="large" color="#5b96d8" />
      </View>
    </Fragment>
  );
};

export default InnerLoader;

const styles = StyleSheet.create({});
