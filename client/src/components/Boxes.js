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

const Boxes = ({
  children,
  deviceName,
  roomName,
  changeState,
  deviceStateValue,
  isLadding,
  ...rest
}) => {
  const [deviceStatus, setDeviceStatus] = useState('off');

  return (
    <View style={styles.container}>
      {isLadding ? <CircleLoader /> : null}
      {deviceStateValue === 'on' ? (
        <MaterialCommunityIcons size={40} color="#f1c919" name="lightbulb-on" />
      ) : (
        <MaterialCommunityIcons size={40} color="#81848d" name="lightbulb" />
      )}

      <Text style={styles.headding}>{deviceName}</Text>
      <View style={styles.switchWrapper}>
        <TouchableOpacity onPress={changeState}>
          {deviceStateValue === 'on' ? (
            <AntDesign size={40} color="#ff0000" name="poweroff" />
          ) : (
            <AntDesign size={40} color="#5b96d8" name="poweroff" />
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
