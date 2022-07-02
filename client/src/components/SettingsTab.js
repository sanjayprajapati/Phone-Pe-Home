import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsTab = ({handleNavigation, tabLabel, iconName, ...rest}) => {
  const IconType = () => {
    switch (iconName) {
      case (iconName = 'home'):
        return (
          <FontAwesome size={22} color="#eee" name="home" style={styles.mr} />
        );
      case (iconName = 'rooms'):
        return (
          <Ionicons
            size={22}
            color="#eee"
            name="cube-outline"
            style={styles.mr}
          />
        );

      case (iconName = 'devices'):
        return (
          <MaterialCommunityIcons
            size={22}
            color="#eee"
            name="select-inverse"
            style={styles.mr}
          />
        );

      case (iconName = 'support'):
        return (
          <FontAwesome
            size={22}
            color="#eee"
            name="support"
            style={styles.mr}
          />
        );

      case (iconName = 'shopping'):
        return (
          <FontAwesome
            size={22}
            color="#eee"
            name="shopping-cart"
            style={styles.mr}
          />
        );

      case (iconName = 'about'):
        return (
          <AntDesign
            size={22}
            color="#eee"
            name="infocirlceo"
            style={styles.mr}
          />
        );
      case (iconName = 'logout'):
        return (
          <AntDesign size={22} color="#eee" name="logout" style={styles.mr} />
        );
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.tabstyle, {borderBottomWidth: 0}]}
      onPress={handleNavigation}>
      <View style={styles.innerrow}>
        <IconType />
        <Text style={styles.tabtext}>{tabLabel}</Text>
      </View>
      <FontAwesome size={22} color="#aaa" name="chevron-right" />
    </TouchableOpacity>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  tabstyle: {
    backgroundColor: '#272a3b',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderColor: '#0c132c',
    borderWidth: 1,
  },
  innerrow: {
    flexDirection: 'row',
  },
  tabtext: {
    color: '#eee',
    fontSize: 16,
  },
  mr: {
    marginRight: 20,
  },
});
