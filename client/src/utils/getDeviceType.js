import {client} from '../api/client';
import {catchError} from './helper';
const data = [
  {
    _id: 1,
    name: '1 Node Switch',
    applianceType: [{applianceName: 'switch', numberOfAppliance: 1}],
  },
  {
    _id: 2,
    name: '2 Node Switch',
    applianceType: [{applianceName: 'switch', numberOfAppliance: 2}],
  },
  {
    _id: 3,
    name: '3 Node Switch',
    applianceType: [{applianceName: 'switch', numberOfAppliance: 3}],
  },
  {
    _id: 4,
    name: '4 Node Switch',
    applianceType: [{applianceName: 'switch', numberOfAppliance: 4}],
  },
  {
    _id: 5,
    name: '5 Node Switch',
    applianceType: [{applianceName: 'switch', numberOfAppliance: 5}],
  },
  {
    _id: 6,
    name: '6 Node Switch',
    applianceType: [{applianceName: 'switch', numberOfAppliance: 6}],
  },
  {
    _id: 7,
    name: 'Heavy Duty',
    applianceType: [{applianceName: 'switch', numberOfAppliance: 2}],
  },
  {
    _id: 8,
    name: '8 Node Switch',
    applianceType: [{applianceName: 'switch', numberOfAppliance: 8}],
  },
];

export const getDeviceType = async () => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.get(`/device/device-type`, config);
    //console.log('>>>>', data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
