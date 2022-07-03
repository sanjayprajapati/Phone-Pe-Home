import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFormikContext} from 'formik';

const FormInput = ({
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
          {borderColor: touched[name] && errors[name] ? '#000' : '#000'},
        ]}>
        <View
          style={[
            styles.iconStyle,
            {borderColor: touched[name] && errors[name] ? '#000' : '#000'},
          ]}>
          {iconType === 'cellphone-message' ? (
            <MaterialCommunityIcons name={iconType} size={22} color="#ccc" />
          ) : (
            <AntDesign name={iconType} size={22} color="#ccc" />
          )}
        </View>
        <TextInput
          value={value}
          placeholder={placheHolder}
          onChangeText={handleChange(name)}
          style={styles.input}
          placeholderTextColor="#ccc"
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
    backgroundColor: '#12162c',
    elevation: 2,
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#000',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#ccc',
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

export default FormInput;
