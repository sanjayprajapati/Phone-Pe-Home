import {client} from '../api/client';
import {catchError, showError} from './helper';

export const getRoomType = async () => {
  try {
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await client.get(
      `${client}/rooms/room-type`,

      config,
    );
    console.log(data);
    return data.rooms;
  } catch (error) {
    return catchError(error.message);
  }
};
