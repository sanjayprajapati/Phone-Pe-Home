import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import NextBtn from '../../components/NextBtn';

const {height, width} = Dimensions.get('window');

const FinalStep = () => {
  const createDevice = () => {
    console.log('Done');
  };
  return (
    <MainLayout pageHeight={height - 80}>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Device Creation</Text>
      </View>
      <NextBtn title="Create Device" action={createDevice} />
    </MainLayout>
  );
};

export default FinalStep;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  mainHeading: {
    fontSize: 22,
    color: '#79c142',
    marginBottom: 20,
  },
});
