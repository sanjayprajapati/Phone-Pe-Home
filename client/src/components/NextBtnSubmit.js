import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useFormikContext} from 'formik';

const NextBtnSubmit = ({buttonTitle, ...rest}) => {
  const {handleSubmit, isSubmitting} = useFormikContext();
  return (
    <TouchableOpacity
      style={styles.btnStyle}
      onPress={isSubmitting ? null : handleSubmit}
      {...rest}
      activeOpacity={0.7}>
      <Text style={styles.title}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default NextBtnSubmit;

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    padding: 10,
    backgroundColor: '#272a3b',
    position: 'absolute',
    bottom: 5,
    zIndex: 1,
  },
  title: {
    color: '#79c142',
    fontSize: 16,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
});
