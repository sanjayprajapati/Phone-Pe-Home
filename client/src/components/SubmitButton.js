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
    height: 48,
    backgroundColor: '#79c142',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
    textTransform: 'uppercase',
  },
});
