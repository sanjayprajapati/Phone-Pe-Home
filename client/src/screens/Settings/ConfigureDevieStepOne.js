import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import {ScrollView} from 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import {getDeviceType} from '../../utils/getDeviceType';
import {async} from 'validate.js';
import {object} from 'yup';

const ConfigureDevieStepOne = ({navigation}) => {
  let initialState = [];
  const [item, setItem] = useState([]);
  useEffect(() => {
    const init = async () => {
      const data = await getDeviceType();
      initialState = [...data];
      setItem(initialState);
      console.log(data);
    };
    init();
  }, []);
  const handleSelector = (id, index) => {
    let style = {
      color: '#79c142',
    };
    let newState = [...item];

    setTimeout(() => {
      newState = item.map(obj => {
        // 👇️ if id equals 2, update country property
        if (obj._id === id) {
          obj = Object.assign({...obj, color: '#79c142'});
          return obj;
        }
        if (object._id !== id) {
          obj = Object.assign({...obj, color: '#fff'});
          return obj;
        }

        // 👇️ otherwise return object as is
        //console.log(obj);
        return obj;
      });

      setItem(newState);
    }, 1000);
  };
  const nextStep = () => {
    navigation.navigate('ConfigureDeviceStepTwo');
  };
  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Pic one of listed bilow</Text>
        <ScrollView>
          <View style={styles.selectorContainer}>
            {item &&
              item.map((item, index) => {
                return (
                  <Pressable
                    style={styles.selector}
                    onPress={() => handleSelector(item._id, index)}
                    key={item._id}>
                    <Image
                      source={require('../../assets/images/node.png')}
                      style={styles.node}
                    />

                    <Text
                      style={[
                        styles.typeText,
                        {color: item.color ? item.color : '#fff'},
                      ]}>
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
          </View>
        </ScrollView>
        <Pressable style={styles.nextBtn} onPress={nextStep}>
          <Text style={styles.btnText}>Next</Text>
        </Pressable>
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
    position: 'relative',
  },
  mainHeading: {
    fontSize: 22,
    color: '#79c142',
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
  nextBtn: {
    position: 'absolute',
    width: '80%',
    height: 40,
    bottom: 0,
    zIndex: 9999999999,
    backgroundColor: '#272a3b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#79c142',
    fontSize: 16,
  },
});