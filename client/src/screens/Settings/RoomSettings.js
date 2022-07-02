import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import SettingsTab from '../../components/SettingsTab';
import Octicons from 'react-native-vector-icons/Octicons';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';

const RoomSettings = ({navigation}) => {
  const [rooms, setRooms] = useState([
    {_id: 1, roomname: 'Living Room', roomtype: 'Living Room', roomtypeId: '1'},
    {_id: 2, roomname: 'Kitchen', roomtype: 'Kitchen', roomtypeId: '2'},
    {_id: 3, roomname: 'Bathroom', roomtype: 'Bathroom', roomtypeId: '1'},
  ]);
  console.log(rooms.length);

  const editRoom = item => {
    console.log(item.roomname);
    navigation.navigate('EditRoom', {item});
  };
  const addRoom = () => {};
  return (
    <MainLayout>
      <ScrollView>
        {rooms.length == 0 ? (
          <View style={styles.containerWithoutRoom}>
            <Octicons size={56} color="#f66" name="alert" />
            <Text style={styles.mainText}>No Rooms Added Yet !</Text>
            <Text style={styles.subText}>
              To add Room click on + icon shown in the Screen
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <View>
              <Text style={styles.subHead}>Your Rooms</Text>
            </View>
            {rooms.map((item, index) => (
              <SettingsTab
                key={item._id}
                tabLabel={item.roomname}
                handleNavigation={() => editRoom(item)}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <Pressable style={styles.addBtn} onPress={addRoom}>
        <Octicons size={22} color="#000" name="plus" />
      </Pressable>
    </MainLayout>
  );
};

export default RoomSettings;
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  subHead: {
    paddingLeft: 20,
    color: '#79c142',
    marginBottom: 10,
    marginTop: 10,
  },
  containerWithoutRoom: {
    height: height - 140,
    paddingTop: 20,
    alignItems: 'center',
  },
  container: {
    height: height - 140,
    paddingTop: 20,
    position: 'relative',
  },
  mainText: {
    fontSize: 18,
    color: '#fff',
  },
  subText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
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
});
