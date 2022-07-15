import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListDevices from '../../components/devices/ListDevices';
import Header from '../../components/Header';
import {logout} from '../../redux/actions/authAction';
import MainLayout from '../Layouts/MainLayout';
import CardDevice from '../../components/devices/CardDevice';
import {getDevices} from '../../utils/devices';
import CircleLoader from '../../components/CircleLoader';

const {height, width} = Dimensions.get('window');

const Dashboard = () => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  //const {loading, devices} = useSelector(state => state.devices);
  //const initialState = [...devices];
  let initialState = [];
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverState, setServerState] = React.useState('Loading...');
  const [messageText, setMessageText] = React.useState('');
  const [disableButton, setDisableButton] = React.useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true);
  const [serverMessages, setServerMessages] = React.useState([]);
  let local = 'ws://192.168.1.5:5000';
  let server = 'wss://origin8home.herokuapp.com';
  let mac = '30:83:98:82:E0:8D';
  let ip = '192.168.1.40';
  let token = {
    userId: 'fbffc3b9-578f-48cb-84a1-4275fcb3a495',
    clientId: '192.168.1.28E8:DB:84:AE:AD:52',
  };
  var headers = {};
  headers['cookie'] = `${JSON.stringify(token)}`;

  var ws = useRef(new WebSocket(local, null, {headers})).current;

  const sendMessage = ({deviceId, state, clientId}) => {
    let payload = {
      header: {
        payloadVersion: 2,
        signatureVersion: 1,
      },
      payload: {
        action: 'setPowerState',
        clientId: 'portal',
        createdAt: Math.floor(Date.now() / 1000),
        deviceId: deviceId,
        message: 'OK',
        replyToken: '516d4932-6461-4032-bccd-36e1f34c71d2',
        success: true,
        type: 'request',
        value: {
          state: state,
        },
      },
      signature: {
        HMAC: 'UyZwpj7tYfZI2ufi6RiHyhcChloByXs1GD8Iqu3wHzQ=',
      },
    };

    ws.send(JSON.stringify(payload));
  };
  useEffect(() => {
    let data = null;
    const getData = async () => {
      data = await getDevices();
      initialState = [...data];
      setItem(initialState);
    };
    getData();
  }, []);
  useEffect(() => {
    const serverMessagesList = [];
    ws.onopen = () => {
      setServerState('Connected to the server');
      setDisableButton(false);
      console.log(serverMessages);
    };
    ws.onclose = e => {
      setServerState('Disconnected. Check internet or server.');
      setDisableButton(true);
      console.log(serverState);
      //clearTimeout(this.pingTimeout);
    };
    ws.onmessage = e => {
      console.log(e);
      //serverMessagesList.push(e.data);
      setServerMessages([serverMessagesList]);
      console.log(serverMessagesList);
    };
    ws.onerror = e => {
      setServerState(e.message);
      console.log(serverState);
    };
  }, []);

  const handleDevicePawerState = (id, index) => {
    let newState = [...item];
    let posi;
    let pawerState;

    setLoading(true);

    newState = item.map(obj => {
      // 👇️
      if (obj._id === id) {
        if (obj.pawerState === 'On') {
          console.log('if', id);

          sendMessage({deviceId: id, state: 'Off', clientId: token.clientId});
          return {...obj, pawerState: 'Off'};
        } else {
          console.log('else', id);

          sendMessage({deviceId: id, state: 'On', clientId: token.clientId});

          return {...obj, pawerState: 'On'};
        }
      }

      // 👇️ otherwise return object as is
      return obj;
    });

    setLoading(false);
    setItem(newState);

    //ws.send(JSON.stringify({deviceId: id, state: obj.pawerState}));

    setMessageText('');
  };
  // Encrypt
  // Decrypt

  return (
    <MainLayout title="Dashboard">
      <View style={styles.container}>
        <View style={styles.deviceContainer}>
          <Text style={styles.mainHeading}>My Devices</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
              {loading ? <CircleLoader /> : null}
              {item &&
                item.map((elem, index) => (
                  <CardDevice
                    key={elem._id}
                    data={elem}
                    devicename={elem.name}
                    roomType={elem.roomType}
                    pawerState={elem.pawerState}
                    deviceType={elem.deviceType}
                    loading={loading}
                    disableButton={disableButton}
                    changeState={() => handleDevicePawerState(elem._id, index)}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </MainLayout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  deviceContainer: {
    padding: 10,
    height: height - 150,
  },
  contentContainer: {
    paddingVertical: 0,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative',
  },
  mainHeading: {
    fontSize: 26,
    color: '#5b96d8',
  },
});
