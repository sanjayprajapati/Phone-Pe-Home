const data = {
  _id: '1234567qwertyu',
};

export const getDeviceID = async value => {
  try {
    console.log(value);
    if (value.deviceId != data._id) return false;
    return data._id;
  } catch (error) {
    return console.log(error);
  }
};
