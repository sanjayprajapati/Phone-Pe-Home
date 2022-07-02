import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useFormikContext} from 'formik';

const SelectDropdown = ({
  deviceName,
  value,
  placheHolder,
  isSecure,
  onChange,
  name,
  roomTypeName,
  data,
  handleRooms,
  handleDropdown,
  display,

  ...props
}) => {
  const {errors, values, touched, handleSubmit, handleChange, handleBlur} =
    useFormikContext();
  return (
    <View>
      <View
        style={[
          styles.selectInputBox,
          {borderColor: touched[name] && errors[name] ? '#000' : '#1a1d2e'},
        ]}>
        <View style={styles.selectInputRow}>
          <TouchableOpacity style={styles.pressbtn} onPress={handleDropdown}>
            <Text style={styles.labelText}>{roomTypeName}</Text>
            <AntDesign name="caretdown" size={22} color="#5b96d8" />
          </TouchableOpacity>
        </View>
        <View style={[styles.itemList, {display: display}]}>
          {data &&
            data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => handleRooms(item, deviceName)}>
                  <Text style={styles.listText}>{item.roomtype}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
        <TextInput
          value={value}
          placeholder={placheHolder}
          onChangeText={handleChange(name)}
          style={styles.input}
          placeholderTextColor="gray"
          clearButtonMode="always"
          {...props}
        />
      </View>
      {errors[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : (
        <Text />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    zIndex: 8,
  },
  selectInputRow: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#fff',
  },
  pressbtn: {
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
    backgroundColor: '#1a1d2e',
    zIndex: 8,
  },
  listText: {
    fontSize: 16,
    padding: 10,
    color: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },

  input: {
    width: 0,
    height: 0,
  },

  error: {
    alignSelf: 'flex-end',
    marginRight: 0,
    color: '#ff0000',
  },
});

export default SelectDropdown;
