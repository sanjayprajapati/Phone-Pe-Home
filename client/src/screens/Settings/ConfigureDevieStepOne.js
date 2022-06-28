import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import {ScrollView} from 'react-native-gesture-handler';

const ConfigureDevieStepOne = () => {
  const handleSelector = () => {};
  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Pic one of listed bilow</Text>
        <ScrollView>
          <View style={styles.selectorContainer}>
            <TouchableOpacity style={styles.selector} onPress={handleSelector}>
              <Image
                source={require('../../assets/images/node.png')}
                style={styles.node}
              />
              <Text style={styles.typeText}>1 Node Swith</Text>
            </TouchableOpacity>

            <View style={styles.selector}>
              <Image
                source={require('../../assets/images/node.png')}
                style={styles.node}
              />
              <Text style={styles.typeText}>2 Node Swith</Text>
            </View>
            <View style={styles.selector}>
              <Image
                source={require('../../assets/images/node.png')}
                style={styles.node}
              />
              <Text style={styles.typeText}>3 Node Swith</Text>
            </View>
            <View style={styles.selector}>
              <Image
                source={require('../../assets/images/node.png')}
                style={styles.node}
              />
              <Text style={styles.typeText}>4 Node Swith</Text>
            </View>
            <View style={styles.selector}>
              <Image
                source={require('../../assets/images/node.png')}
                style={styles.node}
              />
              <Text style={styles.typeText}>8 Node Swith</Text>
            </View>
            <View style={styles.selector}>
              <Image
                source={require('../../assets/images/node.png')}
                style={styles.node}
              />
              <Text style={styles.typeText}>Heavy Duty</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default ConfigureDevieStepOne;
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
    height: height - 140,
  },
  mainHeading: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
  },
  selectorContainer: {
    flexDirection: 'row',
    padding: 0,
    flexWrap: 'wrap',
  },
  selector: {
    width: (width - 50) / 3,
    height: 150,
    backgroundColor: '#272a3b',
    borderRadius: 5,
    marginTo: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    paddingTop: 10,
  },
  node: {
    width: 80,
    height: 56,
  },
  typeText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
});
