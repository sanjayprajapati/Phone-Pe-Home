import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Boxes from '../../components/Boxes';
import Header from '../../components/Header';
import {logout} from '../../redux/actions/authAction';
import MainLayourt from '../Layouts/MainLayout';

const Home = () => {
  const dispatch = useDispatch();
  const [deviceState, SetDeviceState] = useState('off');
  const [isLadding, setIsloadding] = useState(false);

  const logoutUser = ({children}) => {
    dispatch(logout());
  };

  const handleDeviceState = () => {
    setIsloadding(true);
    console.log('inprogress');
    setTimeout(() => {
      if (deviceState === 'on') {
        SetDeviceState('off');
        console.log('Device: off');
        setIsloadding(false);
        return;
      }
      SetDeviceState('on');
      setIsloadding(false);
      console.log('Device: off');
    }, 500);
  };

  useEffect(() => {}, [dispatch]);

  return (
    <MainLayourt title="Home">
      <View style={styles.container}>
        <Boxes
          roomName="Living Room"
          deviceName="Light Bulb"
          changeState={handleDeviceState}
          deviceStateValue={deviceState}
          isLadding={isLadding}
        />
      </View>
    </MainLayourt>
  );
};

export default Home;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
