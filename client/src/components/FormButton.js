import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: 48,
    backgroundColor: '#79c142',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
    textTransform: 'uppercase',
  },
});
