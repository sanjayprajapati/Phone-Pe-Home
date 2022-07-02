import {StyleSheet, Text, Keyboard, View} from 'react-native';
import React, {Fragment} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MainLayout from '../Layouts/MainLayout';
import {Formik} from 'formik';
import * as yup from 'yup';
import Input from '../../components/Input';
import NextBtnSubmit from '../../components/NextBtnSubmit';
import {useState} from 'react';
import InnerLoader from '../../components/InnerLoader';
const initialValues = {
  name: '',
};
const homeEditSchema = yup.object().shape({
  name: yup.string().trim().min(4, 'Too short').required('Name Require'),
});

const EditHome = ({navigation}) => {
  const [name, setName] = useState('Sweet Home');
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (values, FormikActions) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('HomeSettings');
      console.log(values);
    }, 2000);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <MainLayout>
        {isLoading ? <InnerLoader /> : null}
        <Formik
          initialValues={{name}}
          enableReinitialize={true}
          validationSchema={homeEditSchema}
          onSubmit={handleEdit}>
          {({handleSubmit, values}) => {
            return (
              <Fragment>
                <View style={styles.container}>
                  <View>
                    <Text style={styles.subHead}>Edit Your Name</Text>
                  </View>
                  <Input
                    value={values.name}
                    name="name"
                    placheHolder="Enter Home Name *"
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

export default EditHome;

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
