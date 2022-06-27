const data = [
  {
    _id: 1,
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'ON',
    iconType: 'switch',
  },
  {
    _id: 2,
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'ON',
    iconType: 'switch',
  },
  {
    _id: 3,
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'ON',
    iconType: 'switch',
  },
  {
    _id: 4,
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'ON',
    iconType: 'switch',
  },
  {
    _id: 5,
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    pawerState: 'ON',
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
