import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import SettingsTab from '../../components/SettingsTab';
import Octicons from 'react-native-vector-icons/Octicons';
import {ScrollView} from 'react-native-gesture-handler';

const RoomSettings = ({navigation}) => {
  const addRoom = () => {};
  return (
    <MainLayout>
      <ScrollView>
        <View>
          <Text style={styles.subHead}>Your Rooms</Text>
        </View>
        <SettingsTab
          tabLabel="Living Room"
          handleNavigation={() => navigation.navigate('EditHome')}
        />
        <Pressable style={styles.addBtn} onPress={addRoom}>
          <Octicons size={22} color="#000" name="plus" />
        </Pressable>
      </ScrollView>
    </MainLayout>
  );
};

export default RoomSettings;

const styles = StyleSheet.create({
  subHead: {
    paddingLeft: 20,
    color: '#79c142',
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    paddingTop: 50,
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
