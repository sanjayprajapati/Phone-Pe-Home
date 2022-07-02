import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';

import SettingsTab from '../../components/SettingsTab';

const MainScreen = ({navigation}) => {
  const homeSettings = () => {
    navigation.navigate('HomeSettings');
  };
  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headingRow}>
          <Text style={styles.pageHeading}>Sweet Home</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Home and Devices Configuration</Text>
          <SettingsTab
            tabLabel="Home"
            iconName="home"
            handleNavigation={() => navigation.navigate('HomeSettings')}
          />
          <SettingsTab
            tabLabel="Rooms"
            iconName="rooms"
            handleNavigation={() => navigation.navigate('RoomSettings')}
          />
          <SettingsTab
            tabLabel="Devices"
            iconName="devices"
            handleNavigation={() => navigation.navigate('HomeSettings')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Support</Text>
          <SettingsTab
            tabLabel="Support"
            iconName="support"
            handleNavigation={() => navigation.navigate('HomeSettings')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.subHead}>Other Options</Text>
          <SettingsTab
            tabLabel="Buy Origin8 Product"
            iconName="shopping"
            handleNavigation={() => navigation.navigate('HomeSettings')}
          />
          <SettingsTab
            tabLabel="About"
            iconName="about"
            handleNavigation={() => navigation.navigate('HomeSettings')}
          />
          <SettingsTab
            tabLabel="Logout"
            iconName="logout"
            handleNavigation={() => navigation.navigate('HomeSettings')}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  headingRow: {
    marginTop: 20,
    paddingLeft: 20,
  },
  pageHeading: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  subHead: {
    paddingLeft: 20,
    color: '#79c142',
    marginBottom: 5,
  },
  row: {
    marginBottom: 15,
  },
});
