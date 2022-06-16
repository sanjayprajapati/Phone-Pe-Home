import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';

const MainLayourt = ({children}) => {
  return (
    <SafeAreaView>
      <View style={styles.mainWrapper}>{children}</View>
    </SafeAreaView>
  );
};

export default MainLayourt;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#fff',
    height: height,
  },
});
