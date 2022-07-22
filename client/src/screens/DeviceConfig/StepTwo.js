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
import {getControllerId} from '../../utils/getControllerId';
import NextBtnSubmit from '../../components/NextBtnSubmit';
import {Fragment} from 'react';
import Input from '../../components/Input';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import InnerLoader from '../../components/InnerLoader';
import {useState, useEffect} from 'react';
import {getAuthAsyncStorage} from '../../utils/getAuthAsyncStorage';
import {configureDevice} from '../../utils/configureDevice';
import NextBtn from '../../components/NextBtn';
import {useSelector} from 'react-redux';

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

const StepTwo = ({navigation, route}) => {
  const {loading, isAuthenticated, auth} = useSelector(state => state.auth);
  const {controllerTypeId} = route.params;
  let userStorage = null;
  const [user, setUser] = useState(null);
  console.log('sdfsdfsdf', controllerTypeId);
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succesMsg, setSuccessMsg] = useState(null);
  const [controller, setController] = useState(null);
  const handleDeviceID = async (values, FormikActions) => {
    Keyboard.dismiss();
    setIsLoading(true);

    const res = await configureDevice(
      auth['user']._id,
      values.deviceId,
      controllerTypeId,
    );
    FormikActions.setSubmitting(false);
    console.log('response  ', res);
    if (!res.success) {
      console.log('succes false', res.error);
      setError(res.error);
      setIsLoading(false);
      return;
    } else {
      FormikActions.resetForm();
      setIsLoading(false);
      setDisable(false);
      setSuccessMsg(res.message);
      setController(res.controller);
      return console.log(res);
    }
  };
  useEffect(() => {
    const load = async () => {
      let temp;
      userStorage = await getAuthAsyncStorage();
      userStorage = JSON.stringify(userStorage);
      temp = JSON.parse(userStorage);
      temp = temp['user'];
      setUser(temp);
    };
    load();
  }, []);
  const nextStep = () => {
    navigation.navigate('StepThree', {controller});
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
                  {succesMsg == null ? (
                    <Fragment>
                      <Text style={styles.mainHeading}>
                        Please Enter Device ID
                      </Text>

                      <Input
                        value={values.deviceId}
                        name="deviceId"
                        placheHolder="Enter Device ID"
                        iconType="user"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      <NextBtnSubmit buttonTitle="send" position="relative" />
                      {error == null ? null : (
                        <Text style={styles.errors}>{error}</Text>
                      )}
                    </Fragment>
                  ) : (
                    <Text style={styles.success}>{succesMsg}</Text>
                  )}
                </View>
                <NextBtn action={nextStep} title="Next" disable={disable} />
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
  errors: {
    fontSize: 14,
    color: '#fff',
    borderRadius: 10,
    borderColor: '#ff0000',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    width: '100%',
  },
  success: {
    fontSize: 14,
    color: '#79c142',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    width: '100%',
  },
});
