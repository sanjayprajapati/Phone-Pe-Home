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

const AuthLayout = ({children}) => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.wrapper}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    height: height,
    flex: 1,
  },
});
