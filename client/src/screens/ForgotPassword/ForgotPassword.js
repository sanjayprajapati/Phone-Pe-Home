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

import {forgetPassword} from '../../utils/auth';
import AppNocitication from '../../components/AppNocitication';
import {updateNotification} from '../../utils/helper';
import {StackActions} from '@react-navigation/native';
import * as yup from 'yup';

const initState = {
  username: '',
};

const forgotpassSchema = yup.object().shape({
  username: yup.string().trim().required('Please Enter Email/Phone'),
});

const ForgotPassword = ({navigation}) => {
  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const handleFrogetPassword = async (values, FormikActions) => {
    console.log(values);
    const res = await forgetPassword(values);
    FormikActions.setSubmitting(false);

    if (!res.success) {
      console.log('succes false:', res.error);
      return updateNotification(setMessage, res.error);
    } else {
      FormikActions.resetForm();
      updateNotification(setMessage, res.message, 'success');
      navigation.dispatch(
        StackActions.replace('ResetPassword', {user: res.user}),
      );
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
          initialValues={initState}
          validationSchema={forgotpassSchema}
          onSubmit={handleFrogetPassword}>
          {({handleSubmit, values}) => {
            return (
              <View style={styles.container}>
                {/* Email Field */}

                <FormInput
                  name="username"
                  value={values.username}
                  placheHolder="Email/Phone"
                  iconType="user"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* Login Button */}
                <SubmitButton buttonTitle="Submit" />

                {/* Forget Button */}
              </View>
            );
          }}
        </Formik>
      </AuthLayout>
    </Fragment>
  );
};

export default ForgotPassword;

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
