import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ScroolView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const userSignup = () => {
    console.log(password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Account</Text>

      {/* Email Field */}
      <FormInput
        labelValue={name}
        onChangeText={name => setName(name)}
        placheHolder="Name"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={email}
        onChangeText={email => setEmail(email)}
        placheHolder="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={mobile}
        onChangeText={mobile => setMobile(mobile)}
        placheHolder="Mobile"
        iconType="phone"
        keyboardType="phone-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Field */}
      <FormInput
        labelValue={password}
        onChangeText={password => setPassword(password)}
        placheHolder="Password"
        iconType="lock"
        autoCapitalize="none"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={password}
        onChangeText={cpassword => setCpassword(cpassword)}
        placheHolder="Confirm Password"
        iconType="lock"
        autoCapitalize="none"
        secureTextEntry={true}
      />

      {/* Login Button */}
      <FormButton buttonTitle="Sign Up" onPress={userSignup} />

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
};

export default Signup;

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
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
