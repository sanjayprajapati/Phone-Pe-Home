import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CircleLoader from './CircleLoader';

const Boxes = ({children, deviceName, roomName}) => {
  const [deviceStatus, setDeviceStatus] = useState('off');

  const handleEvent = () => {
    setTimeout(() => {
      setDeviceStatus('on');
    }, 1000);
    setDeviceStatus('off');
  };
  return (
    <View style={styles.container}>
      {deviceStatus === 'on' ? <CircleLoader /> : null}
      {deviceStatus === 'on' ? (
        <MaterialCommunityIcons size={40} color="#f1c919" name="lightbulb-on" />
      ) : (
        <MaterialCommunityIcons size={40} color="#81848d" name="lightbulb" />
      )}

      <Text style={styles.headding}>{deviceName}</Text>
      <View style={styles.switchWrapper}>
        <TouchableOpacity onPress={handleEvent}>
          {deviceStatus === 'off' ? (
            <AntDesign size={40} color="#ff0000" name="poweroff" />
          ) : (
            <AntDesign size={40} color="#eee" name="poweroff" />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>{roomName}</Text>
    </View>
  );
};

export default Boxes;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#272a3b',
    width: (width - 40) / 2,
    height: (width - 40) / 1.5,
    borderRadius: 20,
    elevation: 5,
    margin: 5,
    padding: 20,
    alignItems: 'flex-start',
  },
  headding: {
    color: '#e1e2e4',
    fontSize: 22,
    marginTop: 15,
  },
  switchWrapper: {
    marginVertical: 25,
    alignSelf: 'center',
  },
  onOffButton: {},
  bottomText: {
    color: '#e1e2e4',
    fontSize: 16,
  },
  loader: {
    width: 50,
    height: 50,
  },
});
