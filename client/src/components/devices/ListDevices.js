import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllDevices} from '../../redux/actions/deviceAction';
import CardDevice from './CardDevice';

const ListDevices = () => {
  const dispatch = useDispatch();
  //const [data, setData] = useState([]);
  const {loading, devices} = useSelector(state => state.devices);
  const [item, setItem] = useState(devices);

  useEffect(() => {
    dispatch(getAllDevices());
    setItem(devices);
  }, [dispatch]);

  const handleDeviceState = id => {
    let newItem = item.find(index => {
      return index._id === id;
    });
    console.log(newItem);
    setItem(
      item.map(elem => {
        if (elem._id === newItem._id) {
          if (newItem.state === 'ON') {
            return {...elem, state: 'OFF'};
          } else {
            return {...elem, state: 'ON'};
          }
        }
        return elem;
      }),
    );
    console.log(item);
  };
  console.log('yes', item);

  return (
    <View style={styles.deviceContainer}>
      <Text style={styles.mainHeading}>My Devices</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          {devices &&
            devices.map(elem => (
              <CardDevice
                key={elem._id}
                data={elem}
                devicename={elem.name}
                roomType={elem.roomType}
                deviceState={elem.state}
                deviceType={elem.deviceType}
                changeState={() => handleDeviceState(elem._id)}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListDevices;
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  deviceContainer: {
    padding: 10,
    height: height - 150,
  },
  contentContainer: {
    paddingVertical: 0,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mainHeading: {
    fontSize: 26,
    color: '#5b96d8',
  },
});
