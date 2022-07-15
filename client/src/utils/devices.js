const data = [
  {
    _id: '62b31f7a0aec232058ee0018',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'Off',
    iconType: 'switch',
  },
  {
    _id: '62c7d2970aec232058f7d027',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'Off',
    iconType: 'switch',
  },
  {
    _id: '62c7d2970aec232058f7d028',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'Off',
    iconType: 'switch',
  },
  {
    _id: '62b31f7a0aec232058ee0019',
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
