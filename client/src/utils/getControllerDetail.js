import {client} from '../api/client';
import {catchError} from './helper';

export const getControllerDetail = async userId => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.get(
      `/device/controllers-with-room-name/${userId}`,
      config,
    );
    console.log(data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
