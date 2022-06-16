import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Keyboard,
} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import AuthLayout from '../Layouts/AuthLayout';
import {verifyotp} from '../../utils/auth';
import {useDispatch} from 'react-redux';
import {RegisterUser} from '../../redux/actions/authAction';
import {updateNotification} from '../../utils/helper';
import AppNocitication from '../../components/AppNocitication';

const inputs = new Array(6).fill();
let newInputIndex = 0;
const isValidObject = Obj => {
  return Object.values(Obj).every(val => val.trim());
};

const VerifyOtp = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {user} = route.params;

  const [OTP, setOTP] = useState({0: '', 1: '', 2: '', 3: '', 4: '', 5: ''});
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const inputRef = useRef();
  const onHandleChange = (text, index) => {
    const newOtp = {...OTP};
    newOtp[index] = text;
    setOTP(newOtp);

    const lastInputIndex = inputs.length - 1;
    if (!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    setNextInputIndex(newInputIndex);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [nextInputIndex]);

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const onSubmitOtp = async () => {
    Keyboard.dismiss();

    if (isValidObject(OTP)) {
      let val = '';

      Object.values(OTP).forEach(v => {
        val += v;
      });
      console.log(user._id);
      // const res = await verifyotp(val, user._id);
      // if (!res.success) {
      //   console.log('succes false', res.error);
      //   return updateNotification(setMessage, res.error);
      // } else {
      //   updateNotification(setMessage, res.message, 'success');
      //   //console.log(res);
      //   dispatch(RegisterUser(res));
      // }
    }
  };

  return (
    <Fragment>
      {message.text ? (
        <AppNocitication type={message.type} text={message.text} />
      ) : null}

      <View style={styles.container}>
        <Text style={styles.heading}>
          Please verify your account, OTP has been sent to your email and Phone
        </Text>
        <View style={styles.inputContainer}>
          {inputs.map((code, index) => (
            <TextInput
              placeholder="*"
              value={OTP[index]}
              onChangeText={text => onHandleChange(text, index)}
              style={styles.input}
              key={index.toString()}
              keyboardType="number-pad"
              maxLength={1}
              ref={newInputIndex === index ? inputRef : null}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onSubmitOtp}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    elevation: 2,
    margin: 2,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 10,
    height: 48,
    backgroundColor: '#79c142',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    width: 120,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
