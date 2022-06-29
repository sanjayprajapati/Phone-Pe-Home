import {Dimensions, StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useNetInfo} from '@react-native-community/netinfo';
import WifiManager from 'react-native-wifi-reborn';
import React, {useEffect} from 'react';
import MainLayout from '../Layouts/MainLayout';
import {PermissionsAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';
import NextBtn from '../../components/NextBtn';

const StepThree = ({navigation}) => {
  const [isSelected, setSelected] = useState(false);
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

  const setSelection = () => {
    if (isSelected) {
      setSelected(false);
      return;
    }
    setSelected(true);
  };
  const nextStep = () => {
    console.log('YEs');
    navigation.navigate('ConfigureDeviceStepFour');
  };
  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Follow Steps Belwo</Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>. ddfadfga</Text>
          <Text style={styles.listItem}>. ddfadfga</Text>
          <Text style={styles.listItem}>. ddfadfga</Text>
          <Text style={styles.listItem}>. ddfadfga</Text>
        </View>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={setSelection}>
          <CheckBox value={isSelected} style={styles.checkbox} />
          <Text style={styles.label}>Connect to "PhonePeHome_3_rel_xxx"</Text>
        </TouchableOpacity>
      </View>
      <NextBtn title="Next" action={nextStep} />
    </MainLayout>
  );
};

export default StepThree;
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
    width: width - 40,
    position: 'relative',
  },
  mainHeading: {
    fontSize: 22,
    color: '#79c142',
    marginBottom: 20,
  },
  listContainer: {
    margin: 5,
  },
  listItem: {
    color: '#fff',
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#272a3b',
    width: width - 50,
    padding: 5,
  },
  checkbox: {
    alignSelf: 'center',
    color: '#fff',
  },
  label: {
    margin: 8,
    color: '#fff',
    fontSize: 14,
  },
});
