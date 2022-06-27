import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://192.168.1.5:5000/api/v1',
});

// ws url
export const wsurl = 'wss://origin8home.herokuapp.com/';
