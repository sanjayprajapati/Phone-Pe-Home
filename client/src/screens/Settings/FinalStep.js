import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import NextBtn from '../../components/NextBtn';

const FinalStep = () => {
  const createDevice = () => {
    console.log('Done');
  };
  return (
    <MainLayout>
      <Text>FinalStep</Text>
      <NextBtn title="Create Device" action={createDevice} />
    </MainLayout>
  );
};

export default FinalStep;

const styles = StyleSheet.create({});
