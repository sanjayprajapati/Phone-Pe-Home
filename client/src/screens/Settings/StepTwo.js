import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import FormInput from '../../components/FormInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {getDeviceID} from '../../utils/getDeviceId';
import SubmitButton from '../../components/SubmitButton';

const initialValues = {
  deviceId: '',
};
const deviceIdSchema = yup.object().shape({
  deviceId: yup
    .string()
    .trim()
    .min(14, 'Too short')
    .required('Device ID is Missing!'),
});

const StepTwo = ({navigation}) => {
  const handleDeviceID = async (values, FormikActions) => {
    const res = await getDeviceID(values);
    FormikActions.setSubmitting(false);
    console.log(res);
    if (!res) {
      console.log('succes false', res);
      return;
    } else {
      FormikActions.resetForm();

      navigation.navigate('ConfigureDeviceStepThree');
      return console.log(res);
    }
  };
  return (
    <MainLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={deviceIdSchema}
        onSubmit={handleDeviceID}>
        {({handleSubmit, values}) => {
          return (
            <View style={styles.container}>
              <Text style={styles.mainHeading}>Please Enter Device ID</Text>

              <FormInput
                value={values.deviceId}
                name="deviceId"
                placheHolder="Device ID"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <SubmitButton buttonTitle="Next" />
            </View>
          );
        }}
      </Formik>
    </MainLayout>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  mainHeading: {
    fontSize: 22,
    color: '#79c142',
    marginBottom: 20,
  },
});
