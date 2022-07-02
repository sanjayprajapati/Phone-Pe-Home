import {client} from '../api/client';

const data = [
  {
    _id: '1',
    roomtype: 'Living Room',
  },
  {
    _id: '2',
    roomtype: 'Kitchen',
  },
  {
    _id: '3',
    roomtype: 'Bedroom',
  },
  {
    _id: '4',
    roomtype: 'Bathroom',
  },
  {
    _id: '5',
    roomtype: 'Other',
  },
];

export const getRoomType = async () => {
  try {
    console.log(data);
    return data;
  } catch (error) {
    return console.log(error);
  }
};
