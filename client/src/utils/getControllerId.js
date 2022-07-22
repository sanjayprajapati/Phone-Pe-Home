import {client} from '../api/client';
import {catchError} from './helper';

export const getControllerId = async (controllerId, controllerTypeId) => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.post(
      `/device/controller`,
      {controllerId, controllerTypeId},
      config,
    );
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
