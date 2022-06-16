import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScroolView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Dimensions,
} from 'react-native';

import {Formik, FormikActions} from 'formik';

import AuthLayout from '../Layouts/AuthLayout';
import SubmitButton from '../../components/SubmitButton';
import FormInput from '../../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';

import {signin} from '../../utils/auth';
import AppNocitication from '../../components/AppNocitication';
import {updateNotification} from '../../utils/helper';
import * as yup from 'yup';
import {loginUser} from '../../redux/actions/authAction';

const initState = {
  username: '',
  password: '',
};

const loginSchema = yup.object().shape({
  username: yup.string().trim().required('Please Enter Email/Phone'),
  password: yup.string().trim().required('Please Enter Pawword'),
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const handleSignin = async (values, FormikActions) => {
    console.log(values);

    const res = await signin(values);
    FormikActions.setSubmitting(false);

    if (!res.success) {
      console.log('succes false', res.error);

      return updateNotification(setMessage, res.error);
    } else {
      updateNotification(setMessage, res.message, 'success');
      FormikActions.resetForm();
      //console.log(res);
      dispatch(loginUser(res));
    }
  };
  useEffect(() => {}, []);

  return (
    <Fragment>
      {message.text ? (
        <AppNocitication type={message.type} text={message.text} />
      ) : null}
      <AuthLayout>
        <Formik
          initialValues={initState}
          validationSchema={loginSchema}
          onSubmit={handleSignin}>
          {({handleSubmit, values}) => {
            return (
              <View style={styles.container}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.logo}
                />
                <Text style={styles.text}>Phone Pe Home</Text>

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

                {/* Password Field */}
                <FormInput
                  name="password"
                  value={values.password}
                  placheHolder="Password"
                  iconType="lock"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                <View style={styles.checkContainer}>
                  <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.navButtonText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <SubmitButton buttonTitle="Login" />

                {/* Forget Button */}

                {/* Create Account Button*/}
                <TouchableOpacity
                  style={styles.bottombutton}
                  onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.buttontextbottom}>
                    Don't have an account? Create here
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

export default Login;

const {height, width} = Dimensions.get('window');

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
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  bottombutton: {
    marginTop: 35,
  },
  buttontextbottom: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
