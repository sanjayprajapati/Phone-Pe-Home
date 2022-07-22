import {Dimensions, StyleSheet, Text, View, FlatList} from 'react-native';

import {NetInfo} from '@react-native-community/netinfo';
import WifiManager from 'react-native-wifi-reborn';
import React, {useEffect} from 'react';
import MainLayout from '../Layouts/MainLayout';
import {PermissionsAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';
import NextBtn from '../../components/NextBtn';
const {height, width} = Dimensions.get('window');
const StepThree = ({navigation, route}) => {
  const {controller} = route.params;
  console.log(controller);
  const [isSelected, setSelected] = useState(false);
  const [WifiName, setWifyName] = useState(null);
  const [wifiIp, setWifiIp] = useState(null);

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

        console.log('wifi list', wifiList, ipAddr);
        wifiList.forEach(wifi => {
          if (wifi.SSID === 'PHONEPEHOME') {
            setWifyName(wifi.SSID);
          }
        });
        let ipAddr = await WifiManager.getIP();
        setWifiIp(ipAddr);
        console.log(ipAddr, WifiName);
      } else {
        console.log('not permited');
      }
    };
    WWS();
  }, [isSelected]);

  const setSelection = () => {
    if (isSelected) {
      setSelected(false);
      return;
    }
    setSelected(true);
  };
  const nextStep = () => {
    console.log('YEs');
    navigation.navigate('StepFour', {WifiName, wifiIp});
  };
  return (
    <MainLayout pageHeight={height - 80}>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Follow Steps Belwo</Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>
            . IMPORTANT Please, Tunn off Mobile Data (3G,4G, 5G etc)
          </Text>

          <Text style={styles.listItem}>
            . Go to Settings, select WiFi Settings
          </Text>
          <Text style={styles.listItem}>
            . Select WiFi with the name "PHONEPEHOME", connect to that WiFi.
          </Text>
          <Text style={styles.listItem}>
            . Goback Here and Proceed to next step.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={setSelection}>
          <CheckBox value={isSelected} style={styles.checkbox} />

          <Text style={styles.label}>Connect to "PHONEPEHOME"</Text>
        </TouchableOpacity>
        <Text style={[styles.listItem, {color: '#79c142', fontSize: 12}]}>
          Current you are{' '}
          {WifiName === 'PHONEPEHOME'
            ? 'contect to PHONEPEHOME'
            : 'not connected to PHONEPEHOME.'}
        </Text>
      </View>
      <NextBtn
        title="Next"
        action={nextStep}
        disable={
          isSelected == true && WifiName === 'PHONEPEHOME' ? false : true
        }
      />
    </MainLayout>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
    width: width - 40,
    position: 'relative',
    height: '100%',
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
    lineHeight: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#272a3b',
    width: width - 40,
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
