import {StyleSheet, Text, Keyboard, View} from 'react-native';
import React, {Fragment, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MainLayout from '../Layouts/MainLayout';
import {Formik} from 'formik';
import * as yup from 'yup';
import Input from '../../components/Input';
import NextBtnSubmit from '../../components/NextBtnSubmit';
import {useState} from 'react';
import InnerLoader from '../../components/InnerLoader';
import SelectDropdown from '../../components/SelectDropdown';
import {getRoomType} from '../../utils/getRoomType';

const roomsEditSchema = yup.object().shape({
  roomname: yup
    .string()
    .trim()
    .min(4, 'Too short')
    .required('Room Name Missing!'),
  roomtypeId: yup.string().trim().required('Room Type is Missing!'),
});

const EditRoom = ({navigation, route}) => {
  const {roomname, roomtypeId, roomtype} = route.params.item;
  //const [name, setName] = useState(route.params.item.name);
  let data;

  const [isLoading, setIsLoading] = useState(false);
  const [roomtypeid, setRoomtyleid] = useState(roomtypeId);
  const [roomTypeName, setRoomTypeName] = useState(roomtype);
  const [display, setDisplay] = useState('none');
  const [init, setInit] = useState({roomtypeId});
  const [newData, setSetNewData] = useState([]);

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
  };

  const handleEdit = async (values, FormikActions) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('RoomSettings');
      console.log(values);
    }, 2000);
  };
  useEffect(() => {
    const getData = async () => {
      data = await getRoomType();
      //console.log(data);
      setSetNewData(data);
    };
    getData();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <MainLayout>
        {isLoading ? <InnerLoader /> : null}
        <Formik
          initialValues={{roomname, roomtypeId: roomtypeid}}
          enableReinitialize={true}
          validationSchema={roomsEditSchema}
          onSubmit={handleEdit}>
          {({handleSubmit, values}) => {
            console.log(values);
            return (
              <Fragment>
                <View style={styles.container} onPress={handleDropdown}>
                  <View>
                    <Text style={styles.subHead}>Edit Your Room</Text>
                  </View>

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
                  <Input
                    value={values.roomname}
                    name="roomname"
                    placheHolder="Enter Room Name *"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <NextBtnSubmit buttonTitle="Update" />
                </View>
              </Fragment>
            );
          }}
        </Formik>
      </MainLayout>
    </TouchableWithoutFeedback>
  );
};

export default EditRoom;

const styles = StyleSheet.create({
  container: {margin: 20, position: 'relative', paddingBottom: 60},
  subHead: {
    paddingLeft: 0,
    color: '#79c142',
    marginBottom: 10,
    marginTop: 10,
  },
  mt: {
    marginTop: 20,
  },
});
