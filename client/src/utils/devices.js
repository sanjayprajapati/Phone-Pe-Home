const data = [
  {
    _id: '1',
    name: 'Light Bulb',
    roomType: 'Living Room',
    deviceType: 'light',
    state: 'ON',
  },
  {
    _id: '2',
    name: 'Fan',
    roomType: 'Guest Room',
    deviceType: 'fan',
    state: 'OFF',
  },
  {
    _id: '3',
    name: 'AC',
    roomType: 'Master Bedroom',
    deviceType: 'ac',
    state: 'OFF',
  },
  {
    _id: '4',
    name: 'Tube Light',
    roomType: 'Kitchen',
    deviceType: 'light',
    state: 'OFF',
  },
  {
    _id: '5',
    name: 'AC',
    roomType: 'Study Room',
    deviceType: 'ac',
    state: 'ON',
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
