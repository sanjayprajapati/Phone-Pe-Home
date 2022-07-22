import {client} from '../api/client';
import {catchError} from './helper';

export const configureDevice = async (
  userId,
  controllerId,
  controllerTypeId,
) => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.put(
      `https://origin8home.herokuapp.com/api/v1/user/configure-device`,
      {userId, controllerId, controllerTypeId},
      config,
    );
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error.message);
  }
};
