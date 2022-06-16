import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScroolView,
  TouchableOpacity,
  Button,
} from 'react-native';

import {Formik} from 'formik';

import AuthLayout from '../Layouts/AuthLayout';
import SubmitButton from '../../components/SubmitButton';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {login, clearErrors} from '../../redux/actions/userAction';

import {resetPassword} from '../../utils/auth';
import AppNocitication from '../../components/AppNocitication';
import {updateNotification} from '../../utils/helper';
import * as yup from 'yup';

const initState = {
  token: '',
  newPassword: '',
  confirmPassword: '',
};
const otpRegExp = /^[0-9][0-9]{5}$/;
const resetpasswordSchema = yup.object().shape({
  token: yup
    .string()
    .matches(otpRegExp, 'OTP is not valid')
    .required('OTP is Missing'),
  newPassword: yup
    .string()
    .trim()
    .min(8, 'Password is too short')
    .required('Enter new password'),
  confirmPassword: yup
    .string()
    .when('newPassword', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('newPassword')], 'Password not same'),
    })
    .required('Re-enter new password'),
});

const ResetPassword = ({navigation, route}) => {
  const {user} = route.params;

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const handleResetPassword = async (values, FormikActions) => {
    console.log(values);
    values.userId = user._id;
    const res = await resetPassword(values);
    FormikActions.setSubmitting(false);

    if (!res.success) {
      console.log('succes false:', res.error);
      return updateNotification(setMessage, res.error);
    } else {
      FormikActions.resetForm();
      updateNotification(setMessage, res.message, 'success');

      console.log(res);
      navigation.navigate('Login');
    }
  };

  return (
    <Fragment>
      {message.text ? (
        <AppNocitication type={message.type} text={message.text} />
      ) : null}
      <AuthLayout>
        <Formik
          initialValues={initState}
          validationSchema={resetpasswordSchema}
          onSubmit={handleResetPassword}>
          {({handleSubmit, values}) => {
            return (
              <View style={styles.container}>
                {/* Email Field */}

                <FormInput
                  name="token"
                  value={values.token}
                  placheHolder="Enter OTP"
                  iconType="cellphone-message"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <FormInput
                  value={values.newPassword}
                  name="newPassword"
                  placheHolder="New Password"
                  iconType="lock"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                <FormInput
                  value={values.confirmPassword}
                  name="confirmPassword"
                  placheHolder="Confirm Password"
                  iconType="lock"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                {/* Login Button */}
                <SubmitButton buttonTitle="Reset" />

                {/* Forget Button */}

                {/* Create Account Button*/}
              </View>
            );
          }}
        </Formik>
      </AuthLayout>
    </Fragment>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#000',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 0,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  checkContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  checkboxInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
