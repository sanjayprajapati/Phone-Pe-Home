import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import SettingsTab from '../../components/SettingsTab';

const HomeSettings = ({navigation}) => {
  return (
    <MainLayout>
      <View>
        <Text style={styles.subHead}>Its Your Default Home</Text>
      </View>
      <SettingsTab
        tabLabel="Sweet Home"
        handleNavigation={() => navigation.navigate('EditHome')}
      />
    </MainLayout>
  );
};

export default HomeSettings;

const styles = StyleSheet.create({
  subHead: {
    paddingLeft: 20,
    color: '#79c142',
    marginBottom: 10,
    marginTop: 10,
  },
});
