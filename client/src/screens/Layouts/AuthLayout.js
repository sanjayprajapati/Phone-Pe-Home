import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
const STYLES = ['default', 'dark-content', 'light-content'];

const AuthLayout = ({children, pageHeight}) => {
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  return (
    <KeyboardAvoidingView
      style={[
        styles.wrapper,
        {height: pageHeight ? pageHeight : height - 140},
      ]}>
      <StatusBar
        animated={true}
        backgroundColor="#181b2c"
        barStyle={statusBarStyle}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.wrapper}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#181b2c',
    height: height - 27,
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#181b2c',
    height: height - 85,
    flex: 1,
  },
});
