import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListDevices from '../../components/devices/ListDevices';
import Header from '../../components/Header';
import {logout} from '../../redux/actions/authAction';
import MainLayout from '../Layouts/MainLayout';
import CardDevice from '../../components/devices/CardDevice';
import {getDevices} from '../../utils/devices';
import CircleLoader from '../../components/CircleLoader';
const {height, width} = Dimensions.get('window');

const Home = () => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  //const {loading, devices} = useSelector(state => state.devices);
  //const initialState = [...devices];
  let initialState = [];
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let data = null;
    const getData = async () => {
      data = await getDevices();
      initialState = [...data];
      setItem(initialState);
    };
    getData();
  }, []);

  const handleDevicePawerState = (id, index) => {
    let newState = [...item];
    let posi;

    setLoading(true);
    setTimeout(() => {
      newState = item.map(obj => {
        // 👇️ if id equals 2, update country property
        if (obj._id === id) {
          if (obj.pawerState === 'ON') {
            return {...obj, pawerState: 'OFF'};
          } else {
            return {...obj, pawerState: 'ON'};
          }
        }

        // 👇️ otherwise return object as is
        return obj;
      });

      setLoading(false);
      setItem(newState);
    }, 1000);
  };

  return (
    <MainLayout title="Home">
      <View style={styles.container}>
        <View style={styles.deviceContainer}>
          <Text style={styles.mainHeading}>My Devices</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
              {loading ? <CircleLoader /> : null}
              {item &&
                item.map((elem, index) => (
                  <CardDevice
                    key={elem._id}
                    data={elem}
                    devicename={elem.name}
                    roomType={elem.roomType}
                    pawerState={elem.pawerState}
                    deviceType={elem.deviceType}
                    loading={loading}
                    changeState={() => handleDevicePawerState(elem._id, index)}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </MainLayout>
  );
};

export default Home;

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
    position: 'relative',
  },
  mainHeading: {
    fontSize: 26,
    color: '#5b96d8',
  },
});
