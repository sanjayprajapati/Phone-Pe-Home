const data = [
  {
    _id: '62d39de33ec7e13a8051e016',
    controllerId: '62d39cd13ec7e13a8051e00e',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'Off',
    iconType: 'switch',
  },
  {
    _id: '62d39de33ec7e13a8051e017',
    controllerId: '62d39cd13ec7e13a8051e00e',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'Off',
    iconType: 'switch',
  },
  {
    _id: '62d39de33ec7e13a8051e018',
    controllerId: '62d39cd13ec7e13a8051e00e',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'Off',
    iconType: 'switch',
  },
  {
    _id: '62d2f874249334b6e1231754',
    controllerId: '62d2f75b249334b6e1231745',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'Off',
    iconType: 'switch',
  },
  {
    _id: '62d2f874249334b6e1231755',
    controllerId: '62d2f75b249334b6e1231745',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'Off',
    iconType: 'switch',
  },
];
export const getDevices = async () => {
  try {
    //console.log(data);
    return data;
  } catch (error) {
    return console.log(error);
  }
};
export const getDeviceIds = async () => {
  try {
    let deviceids = [];
    for (let i; i < data.length; i++) {
      deviceids.push(data._id);
    }
    return deviceids;
  } catch (error) {
    return console.log(error);
  }
};
