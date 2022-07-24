import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import MainLayout from '../Layouts/MainLayout';
import FormInput from '../../components/FormInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {getDeviceID} from '../../utils/getDeviceId';
import NextBtnSubmit from '../../components/NextBtnSubmit';
import {Fragment} from 'react';
import Input from '../../components/Input';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import InnerLoader from '../../components/InnerLoader';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from '../../components/SelectDropdown';
import {async} from 'validate.js';
import {getRoomType} from '../../utils/getRoomType';
import {getAuthAsyncStorage} from '../../utils/getAuthAsyncStorage';
import {updateDeviceName} from '../../utils/updateDeviceName';

const initialValues = {
  devicename: '',
  roomtypeId: '',
};
const createDeviceSchema = yup.object().shape({
  devicename: yup
    .string()
    .trim()
    .min(4, 'Too short')
    .required('Device ID is Missing!'),
  roomtypeId: yup.string().trim().required('Room Type is Missing!'),
});
const {height, width} = Dimensions.get('window');

const FinalStep = ({navigation, route}) => {
  const {controller} = route.params;
  console.log(controller);
  let data;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomTypeName, setRoomTypeName] = useState('Select Room Type');
  const [roomtypeid, setRoomtyleid] = useState('');
  const [display, setDisplay] = useState('none');
  const [deviceName, setDeviceName] = useState('');
  const [newData, setSetNewData] = useState([]);
  const inputRef = useRef();

  const handleDropdown = () => {
    if (display === 'none') {
      setDisplay('flex');
      return;
    }
    setDisplay('none');
  };

  const handleRooms = item => {
    setDisplay('none');
    setRoomTypeName(item.roomtype);
    setRoomtyleid(item._id);
    //console.log(obj);
  };

  const handleDeviceID = async (values, FormikActions) => {
    Keyboard.dismiss();
    setIsLoading(true);
    const res = await updateDeviceName(
      values.devicename,
      values.roomtypeId,
      user._id,
      controller._id,
    );
    FormikActions.setSubmitting(false);
    console.log(res);
    if (!res) {
      FormikActions.resetForm();
      console.log('succes false', res);
      setIsLoading(false);
      setInit(initialValues);
      setRoomTypeName('Select Room Type');
      return;
    } else {
      FormikActions.resetForm();
      setIsLoading(false);

      setRoomTypeName('Select Room Type');
      console.log(res);
      navigation.navigate('Settings', {screen: 'DeviceSettings'});
      return console.log(res);
    }
  };
  //console.log('>>>', isLoading);

  useEffect(() => {
    const getData = async () => {
      data = await getRoomType();

      setSetNewData(data);
      console.log(data);
      setIsLoading(false);
    };
    getData();
  }, []);
  useEffect(() => {
    const load = async () => {
      let temp;
      let userStorage;
      userStorage = await getAuthAsyncStorage();
      userStorage = JSON.stringify(userStorage);
      temp = JSON.parse(userStorage);
      temp = temp['user'];

      setUser(temp);
    };
    load();
    console.log('userid is=======', user._id);
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <MainLayout pageHeight={height - 80}>
        {isLoading ? <InnerLoader /> : null}
        <Formik
          initialValues={{devicename: deviceName, roomtypeId: roomtypeid}}
          enableReinitialize={true}
          validationSchema={createDeviceSchema}
          onSubmit={handleDeviceID}>
          {({handleSubmit, values}) => {
            console.log(values);
            return (
              <Fragment>
                <View style={styles.container}>
                  <Text style={styles.labels}>Select Room To Assign</Text>

                  <SelectDropdown
                    roomTypeName={roomTypeName}
                    display={display}
                    data={newData}
                    handleRooms={handleRooms}
                    handleDropdown={handleDropdown}
                    value={values.roomtypeId}
                    name="roomtypeId"
                    placheHolder="*"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <Text style={styles.labels}>Name Your Device</Text>
                  <Input
                    value={values.devicename}
                    name="devicename"
                    placheHolder="Enter Room Name"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <NextBtnSubmit
                  buttonTitle="Create Device"
                  position="absolute"
                />
              </Fragment>
            );
          }}
        </Formik>
      </MainLayout>
    </TouchableWithoutFeedback>
  );
};

export default FinalStep;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  labels: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  selectInputBox: {
    marginTop: 5,
    marginBottom: 0,
    width: '100%',
    height: 48,
    borderColor: '#1a1d2e',
    borderRadius: 0,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d2e',
    elevation: 3,
    position: 'relative',
  },
  selectInputRow: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#fff',
  },
  pressbtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelText: {
    color: '#ccc',
    fontSize: 16,
  },
  itemList: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: '#1a1d2e',
    zIndex: 1,
  },
  listText: {
    fontSize: 16,
    padding: 10,
    color: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
});
