import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import FormInput from '../../components/FormInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {getDeviceID} from '../../utils/getDeviceId';
import NextBtnSubmit from '../../components/NextBtnSubmit';
import {Fragment} from 'react';
import Input from '../../components/Input';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import InnerLoader from '../../components/InnerLoader';
import {useState} from 'react';

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
const {height, width} = Dimensions.get('window');

const StepTwo = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeviceID = async (values, FormikActions) => {
    Keyboard.dismiss();
    setIsLoading(true);

    const res = await getDeviceID(values);
    FormikActions.setSubmitting(false);
    console.log(res);
    if (!res) {
      console.log('succes false', res);
      setIsLoading(false);
      return;
    } else {
      FormikActions.resetForm();
      setIsLoading(false);
      navigation.navigate('StepThree');
      return console.log(res);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <MainLayout pageHeight={height - 80}>
        {isLoading ? <InnerLoader /> : null}
        <Formik
          initialValues={initialValues}
          validationSchema={deviceIdSchema}
          onSubmit={handleDeviceID}>
          {({handleSubmit, values}) => {
            return (
              <Fragment>
                <View style={styles.container}>
                  <Text style={styles.mainHeading}>Please Enter Device ID</Text>

                  <Input
                    value={values.deviceId}
                    name="deviceId"
                    placheHolder="Enter Device ID"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <NextBtnSubmit buttonTitle="Next" />
              </Fragment>
            );
          }}
        </Formik>
      </MainLayout>
    </TouchableWithoutFeedback>
  );
};

export default StepTwo;

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
