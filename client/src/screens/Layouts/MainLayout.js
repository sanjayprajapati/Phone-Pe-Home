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
import Header from '../../components/Header';
const STYLES = ['default', 'dark-content', 'light-content'];

const MainLayourt = ({children, title}) => {
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        animated={true}
        backgroundColor="#181b2c"
        barStyle={statusBarStyle}
      />
      <Header title={title} />
      <View style={styles.mainWrapper}>{children}</View>
    </SafeAreaView>
  );
};

export default MainLayourt;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#181b2c',
  },
  mainWrapper: {
    height: height,
  },
});
