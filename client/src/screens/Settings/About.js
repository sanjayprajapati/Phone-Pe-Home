import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import pkg from '../../../package.json';

const About = () => {
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
            <Text style={styles.childstyle}>Platform</Text>
            <Text style={styles.childstyle}>
              {Platform.OS === 'android' ? 'Android' : 'IOS'}
            </Text>
          </View>
          <View style={styles.childContainer}>
            <Text style={styles.childstyle}>Virsion</Text>
            <Text style={styles.childstyle}>{pkg.version}</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default About;

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
    alignItems: 'center',
  },
  childstyle: {
    fontSize: 16,
    color: '#CCC',
  },
});
