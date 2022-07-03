import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFormikContext} from 'formik';

const Input = ({
  iconType,
  value,
  placheHolder,
  isSecure,
  onChange,
  name,

  ...props
}) => {
  const {errors, values, touched, handleSubmit, handleChange, handleBlur} =
    useFormikContext();
  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          {borderColor: touched[name] && errors[name] ? '#000' : '#1a1d2e'},
        ]}>
        <TextInput
          value={value}
          placeholder={placheHolder}
          onChangeText={handleChange(name)}
          style={styles.input}
          placeholderTextColor="gray"
          onBlur={handleBlur(name)}
          clearButtonMode="always"
          {...props}
        />
      </View>
      {touched[name] && errors[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : (
        <Text />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 0,
    width: '100%',
    height: 48,
    borderColor: '#000',
    borderRadius: 0,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d2e',
    elevation: 5,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    height: 48,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  error: {
    alignSelf: 'flex-end',
    marginRight: 0,
    color: '#ff0000',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
});

export default Input;
