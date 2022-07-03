import React, {Fragment, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ScroolView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import AuthLayout from '../Layouts/AuthLayout';
import SubmitButton from '../../components/SubmitButton';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../redux/actions/userAction';
import CustomFormikContainer from '../../components/CustomFormikContainer';
import {Formik} from 'formik';
import * as yup from 'yup';

import {signup} from '../../utils/auth';
import AppNocitication from '../../components/AppNocitication';
import {updateNotification} from '../../utils/helper';
import {StackActions} from '@react-navigation/native';

const initialValues = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  cpassword: '',
};

const phoneRegExp = /^[6789][0-9]{9}$/;
const nameRegExp = /^[a-zA-Z ]+$/;

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(nameRegExp, 'Name contain alphabets only')
    .min(4, 'Too short')

    .required('Name is Missing!'),
  email: yup.string().email('Invalid Email').required('Email is Missing!'),
  mobile: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is Missing!'),
  password: yup
    .string()
    .trim()
    .min(8, 'Password is too short')
    .required('Password is Missing!'),
  cpassword: yup
    .string()
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both password need to be the same'),
    })
    .required('Confirm Password is Missing!'),
});

const Signup = ({navigation}) => {
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  const handleSignup = async (values, FormikActions) => {
    const res = await signup(values);
    FormikActions.setSubmitting(false);
    if (!res.success) {
      console.log('succes false', res.error);
      return updateNotification(setMessage, res.error);
    } else {
      FormikActions.resetForm();
      updateNotification(setMessage, res.message, 'success');

      navigation.dispatch(StackActions.replace('VerifyOtp', {user: res.user}));
      return console.log(res);
    }
  };

  return (
    <Fragment>
      {message.text ? (
        <AppNocitication type={message.type} text={message.text} />
      ) : null}
      <AuthLayout>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSignup}>
          {({handleSubmit, values}) => {
            return (
              <View style={styles.container}>
                <Text style={styles.text}>Create Account</Text>

                {/* Email Field */}
                <FormInput
                  value={values.name}
                  name="name"
                  placheHolder="Name"
                  iconType="user"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <FormInput
                  value={values.email}
                  name="email"
                  placheHolder="Email"
                  iconType="mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <FormInput
                  value={values.mobile}
                  name="mobile"
                  placheHolder="Mobile"
                  iconType="phone"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* Password Field */}
                <FormInput
                  value={values.password}
                  name="password"
                  placheHolder="Password"
                  iconType="lock"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                <FormInput
                  value={values.cpassword}
                  name="cpassword"
                  placheHolder="Confirm Password"
                  iconType="lock"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                {/* Login Button */}
                <SubmitButton buttonTitle="Sign Up" />

                {/* Create Account Button*/}
                <TouchableOpacity
                  style={styles.forgotButton}
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.navButtonText}>
                    Already have an accout? Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </AuthLayout>
    </Fragment>
  );
};

export default Signup;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#fff',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5b96d8',
    fontFamily: 'Lato-Regular',
  },
});
