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
import React from 'react';
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

const initialValues = {
  deviceId: '',
  roomsId: '',
};
const createDeviceSchema = yup.object().shape({
  deviceId: yup
    .string()
    .trim()
    .min(4, 'Too short')
    .required('Device ID is Missing!'),
  roomsId: yup.string().trim().required('Room Type is Missing!'),
});
const {height, width} = Dimensions.get('window');

const FinalStep = ({navigation}) => {
  const roomType = [
    {_id: 1, name: 'Living Room'},
    {_id: 2, name: 'Kitchen'},
    {_id: 3, name: 'Bathroom'},
    {_id: 4, name: 'Bedroom'},
    {_id: 5, name: 'Other'},
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState('Select Room Type');
  const [display, setDisplay] = useState('none');
  const [init, setInit] = useState(initialValues);
  const [val, setVal] = useState('');

  const handleDropdown = () => {
    if (display === 'none') {
      setDisplay('flex');
      return;
    }
    setDisplay('none');
  };

  const handleRooms = (item, deviceName) => {
    setDisplay('none');
    setRoom(item.name);
    let obj = {...init};
    obj.roomsId = item._id.toString();
    obj.deviceId = deviceName;
    setInit({...obj});
    console.log(obj);
  };

  const handleDeviceID = async (values, FormikActions) => {
    // Keyboard.dismiss();
    // setIsLoading(true);

    // const res = await getDeviceID(values);
    // FormikActions.setSubmitting(false);
    // console.log(res);
    // if (!res) {
    //   FormikActions.resetForm();
    //   console.log('succes false', res);
    //   setIsLoading(false);
    //   setInit(initialValues);
    //   setRoom('Select Room Type');

    //   return;
    // } else {
    //   FormikActions.resetForm();
    //   setIsLoading(false);
    //   setVal('');
    //   setRoom('Select Room Type');
    //   navigation.navigate('StepThree');
    //   return console.log(res);
    // }
    navigation.navigate('Settings');
  };
  //console.log('>>>', isLoading);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <MainLayout pageHeight={height - 80}>
        {isLoading ? <InnerLoader /> : null}
        <Formik
          initialValues={init}
          enableReinitialize={true}
          validationSchema={createDeviceSchema}
          onSubmit={handleDeviceID}>
          {({handleSubmit, values}) => {
            console.log(values);
            //setVal(values.deviceId);
            return (
              <Fragment>
                <View style={styles.container}>
                  <Text style={styles.labels}>Select Room To Assign</Text>

                  <SelectDropdown
                    room={room}
                    display={display}
                    data={roomType}
                    deviceName={values.deviceId}
                    handleRooms={handleRooms}
                    handleDropdown={handleDropdown}
                    value={values.roomsId}
                    name="roomsId"
                    placheHolder="*"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <Text style={styles.labels}>Name Your Device</Text>
                  <Input
                    value={values.deviceId}
                    name="deviceId"
                    placheHolder="Enter Room Name"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <NextBtnSubmit buttonTitle="Create Device" />
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
