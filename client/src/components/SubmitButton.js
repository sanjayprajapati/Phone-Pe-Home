import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useFormikContext} from 'formik';

const SubmitButton = ({buttonTitle, ...rest}) => {
  const {handleSubmit, isSubmitting} = useFormikContext();
  return (
    <Pressable
      style={[styles.buttonContainer]}
      onPress={isSubmitting ? null : handleSubmit}
      {...rest}>
      {isSubmitting ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      )}
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#272a3b',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 16,
    color: '#79c142',
    fontFamily: 'Lato-Regular',
    textTransform: 'uppercase',
  },
});
