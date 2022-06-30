import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
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
const createDeviceSchema = yup.object().shape({
  deviceId: yup
    .string()
    .trim()
    .min(14, 'Too short')
    .required('Device ID is Missing!'),
});
const {height, width} = Dimensions.get('window');

const FinalStep = ({navigation}) => {
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

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
  console.log('>>>', isLoading);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <MainLayout pageHeight={height - 80}>
        {isLoading ? <InnerLoader /> : null}
        <Formik
          initialValues={initialValues}
          validationSchema={createDeviceSchema}
          onSubmit={handleDeviceID}>
          {({handleSubmit, values}) => {
            return (
              <Fragment>
                <View style={styles.container}>
                  <Text style={styles.labels}>Select Room To Assign</Text>
                  <SelectDropdown
                    dropdownStyle={styles.selectbox}
                    data={countries}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                  />
                  <Text style={styles.labels}>Name Your Room</Text>
                  <Input
                    value={values.deviceId}
                    name="deviceId"
                    placheHolder="Enter Room Name"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <NextBtnSubmit buttonTitle="Create Device" />
              </Fragment>
            );
          }}
        </Formik>
      </MainLayout>
    </TouchableWithoutFeedback>
  );
};

export default FinalStep;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  labels: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  selectbox: {
    color: '#fff',
    backgroundColor: '#1a1d2e',
    justifyContent: 'center',
  },
});
