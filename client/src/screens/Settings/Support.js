import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import pkg from '../../../package.json';

const Support = () => {
  return (
    <MainLayout>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.about}>Origin8Solutions Smart Home</Text>
        <Text style={styles.subtext}>Noida , U.P.</Text>
        <View style={styles.subContainer}>
          <View style={styles.childContainer}>
            <Text style={styles.childLeft}>Contacts</Text>
            <Text style={styles.childLeft}>+91-87647564756</Text>
          </View>
          <View style={styles.childContainer}>
            <Text style={styles.childRight}>Adress</Text>
            <Text style={styles.childRight}>44-A Jagat Puri</Text>
            <Text style={styles.childRight}>Noida, U.P.</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  about: {
    fontSize: 22,
    color: '#fff',
  },
  subtext: {
    fontSize: 16,
    color: '#ccc',
  },
  subContainer: {
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    marginTop: 50,
    width: '100%',
    flexDirection: 'row',
  },
  childContainer: {
    width: '50%',
  },
  childLeft: {
    fontSize: 16,
    color: '#CCC',
    alignSelf: 'flex-start',
  },
  childRight: {
    fontSize: 16,
    color: '#CCC',
    alignSelf: 'flex-end',
  },
});
