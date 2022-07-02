import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://origin8home.herokuapp.com/api/v1',
});

// ws url
export const wsurl = 'wss://origin8home.herokuapp.com/';
