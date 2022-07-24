import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Devices = () => {
  return (
    <MainLayout>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>5</Text>
          </View>
          <Text style={styles.roomname}>Living Room</Text>
          <View style={styles.bottomItem}>
            <Text style={styles.bottmText}>3</Text>
            <TouchableOpacity>
              <AntDesign size={20} color="#5b96d8" name="poweroff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <Text>dfsdfa</Text>
        </View>
        <View style={styles.container}>
          <Text>dfsdfa</Text>
        </View>
        <View style={styles.container}>
          <Text>dfsdfa</Text>
        </View>
      </View>
    </MainLayout>
  );
};

export default Devices;
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
    backgroundColor: '#272a3b',
    width: (width - 40) / 2,
    height: (width - 40) / 2,
    borderRadius: 5,
    elevation: 5,
    margin: 5,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    alignItems: 'flex-start',
  },
  circle: {
    width: (width - 40) / 4,
    height: (width - 40) / 4,
    borderRadius: 50,
    borderColor: '#181b2c',
    borderWidth: 3,
    backgroundColor: '#272a3b',
    elevation: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  circleText: {
    fontSize: 30,
    color: '#fff',
  },
  roomname: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
  bottomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  bottmText: {
    color: '#fff',
  },
});
