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
import AntDesign from 'react-native-vector-icons/AntDesign';

const initialValues = {
  deviceId: '',
};
const createDeviceSchema = yup.object().shape({
  deviceId: yup
    .string()
    .trim()
    .min(14, 'Too short')
    .required('Device ID is Missing!'),
  roomsId: yup.string().trim().required('Room Type is Missing!'),
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
                  <View style={styles.selectInputBox}>
                    <View style={styles.selectInputRow}>
                      <Text style={styles.labelText}>Select Room Type</Text>
                      <AntDesign name="caretdown" size={22} color="#5b96d8" />
                    </View>
                    <View style={styles.itemList}>
                      <Text style={styles.listText}>Jai ho</Text>
                      <Text style={styles.listText}>Jai ho</Text>
                      <Text style={styles.listText}>Jai ho</Text>
                      <Text style={styles.listText}>Jai ho</Text>
                      <Text style={styles.listText}>Jai ho</Text>
                    </View>
                  </View>
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
  selectInputBox: {
    marginTop: 5,
    marginBottom: 0,
    width: '100%',
    height: 48,
    borderColor: '#1a1d2e',
    borderRadius: 0,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d2e',
    elevation: 3,
    position: 'relative',
  },
  selectInputRow: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelText: {
    color: '#ccc',
    fontSize: 16,
  },
  itemList: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
    width: '100%',
  },
  listText: {
    fontSize: 16,
    padding: 10,
  },
});
