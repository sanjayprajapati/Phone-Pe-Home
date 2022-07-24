import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import NextBtn from '../../components/NextBtn';
import {Fragment} from 'react';
const {height, width} = Dimensions.get('window');

const StepFour = ({navigation, route}) => {
  const {WifiName, wifiIp, controller} = route.params;
  console.log(WifiName);
  const nextStep = () => {
    navigation.navigate('FinalStep', {controller});
  };
  return (
    <Fragment>
      <View style={{flex: 1}}>
        {WifiName === 'PHONEPEHOME' ? (
          <WebView
            source={{uri: `http://192.168.4.1`}}
            style={{marginTop: 20, backgroundColor: '#fff', height: 200}}
          />
        ) : (
          <Text>Something Wrong</Text>
        )}
      </View>
      <NextBtn title="Next" action={nextStep} />
    </Fragment>
  );
};

export default StepFour;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  mainHeading: {
    fontSize: 22,
    color: '#79c142',
    marginBottom: 20,
  },
});
