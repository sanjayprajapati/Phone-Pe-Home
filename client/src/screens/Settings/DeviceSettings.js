import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment} from 'react';
import MainLayout from '../Layouts/MainLayout';
import Octicons from 'react-native-vector-icons/Octicons';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getControllerDetail} from '../../utils/getControllerDetail';
import InnerLoader from '../../components/InnerLoader';
import Loader from '../../components/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DeviceSettings = ({navigation}) => {
  const {auth} = useSelector(state => state.auth);
  //console.log(auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState(null);
  const gotoStepOne = () => {
    navigation.navigate('DeviceConfig');
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getControllerDetail(auth.user._id);
        console.log(response);
        if (!response.success) {
          setErrors(response.error);
          setIsLoading(false);
          console.log('incomming data', response.error);
        } else {
          setDevices([...response.data]);
          setIsLoading(false);
          setErrors(null);
          console.log('devicess ======', devices);
          console.log('incomming data', response.data);
        }
      } catch (error) {
        console.log(error);
        setErrors(error);
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  return (
    <MainLayout>
      <View style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            {errors != null && devices.length == 0 ? (
              <View style={styles.containerWithout}>
                <Octicons size={56} color="#f66" name="alert" />
                <Text style={styles.mainText}>No Device Added Yet !</Text>
                <Text style={styles.subText}>
                  To add device click on + icon shown in the Screen
                </Text>
              </View>
            ) : (
              devices.map(item => (
                <Fragment>
                  <View>
                    <Text style={styles.subHead}>
                      All Your Registered Devices
                    </Text>
                  </View>
                  <View style={styles.row} key={item.roomId}>
                    <View style={styles.rows}>
                      <AntDesign size={22} color="#fff" name="arrowdown" />
                      <Text style={styles.tabtext}>{item.roomname}</Text>
                    </View>
                    {item.controllers.map((con, index) => (
                      <TouchableOpacity
                        key={con.controllerId}
                        onPress={() => navigation.navigate('Devices')}>
                        <View style={styles.contrwo}>
                          <Text style={styles.tabtext}>
                            {index + 1} {con.controllername}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Fragment>
              ))
            )}
          </Fragment>
        )}
      </View>
      <Pressable style={styles.addBtn} onPress={gotoStepOne}>
        <Octicons size={22} color="#000" name="plus" />
      </Pressable>
    </MainLayout>
  );
};

export default DeviceSettings;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  containerWithout: {
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    paddingTop: 50,
  },
  container: {
    position: 'relative',
    height: '100%',
    paddingTop: 20,
  },
  mainText: {
    fontSize: 18,
    color: '#fff',
  },
  subText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
    alignSelf: 'center',
  },
  subHead: {
    paddingLeft: 20,
    color: '#79c142',
    marginBottom: 10,
    marginTop: 10,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#79c142',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 9,
  },
  row: {
    marginBottom: 10,
  },
  rows: {
    flexDirection: 'row',
    backgroundColor: '#272a3b',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-start',
    borderColor: '#0c132c',
    borderWidth: 1,
  },
  contrwo: {
    borderColor: '#0c132c',
    borderWidth: 1,
    backgroundColor: '#272a3b',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tabtext: {
    color: '#eee',
    fontSize: 16,
    marginLeft: 20,
  },
});
