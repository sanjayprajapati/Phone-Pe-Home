import {StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useNetInfo} from '@react-native-community/netinfo';
import WifiManager from 'react-native-wifi-reborn';
import React, {useEffect} from 'react';
import MainLayout from '../Layouts/MainLayout';
import {PermissionsAndroid} from 'react-native';

const ConfigureDeviceStepThree = () => {
  const netInfo = useNetInfo();
  const wifi = async () => {
    try {
      const data = await WifiManager.connectToProtectedSSID(
        ssid,
        password,
        isWep,
      );
      console.log('Connected successfully!', {data});
      //setConneted({connected: true, ssid});
    } catch (error) {
      //setConneted({connected: false, error: error.message});
      console.log('Connection failed!', {error});
    }

    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      //setSsid(ssid);
      console.log('Your current connected wifi SSID is ' + ssid);
    } catch (error) {
      // setSsid('Cannot get current SSID!' + error.message);
      console.log('Cannot get current SSID!', {error});
    }
  };
  useEffect(() => {
    const WWS = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let wifiList = await WifiManager.loadWifiList(); //wifiList will be Array<WifiEntry>
        console.log('wifi list', wifiList);
      } else {
        // Permission denied
      }
    };
    WWS();
    wifi();
  }, []);
  return (
    <MainLayout>
      <Text style={{color: '#fff'}}>{netInfo.type}</Text>
    </MainLayout>
  );
};

export default ConfigureDeviceStepThree;

const styles = StyleSheet.create({});
