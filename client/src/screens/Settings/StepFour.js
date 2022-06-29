import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import NextBtn from '../../components/NextBtn';

const StepFour = ({navigation}) => {
  const nextStep = () => {
    navigation.navigate('FinalStep');
  };
  return (
    <MainLayout>
      <Text>StepFour</Text>
      <NextBtn title="Next" action={nextStep} />
    </MainLayout>
  );
};

export default StepFour;

const styles = StyleSheet.create({});
