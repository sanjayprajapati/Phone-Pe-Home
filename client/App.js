import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Routes from './src/navigations/Routes';
import {loggedUser} from './src/redux/actions/authAction';
import {getAuthAsyncStorage} from './src/utils/getAuthAsyncStorage';
import Loader from './src/components/Loader';

const App = () => {
  const [isLoading, setIsLoadingAsyncStorage] = useState(true);

  useEffect(() => {
    const load = async () => {
      await setIsLoadingAsyncStorage(true);
      const userStorage = await getAuthAsyncStorage();
      if (userStorage.user && userStorage.token) {
        await store.dispatch(
          loggedUser({
            user: userStorage.user,
            token: userStorage.token,
          }),
        );
      }
      await setIsLoadingAsyncStorage(false);
    };
    load();
  }, []);
  //console.log(isLoading);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
