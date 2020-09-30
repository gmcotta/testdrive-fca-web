import axios from 'axios';

export const ibmApi = axios.create({
  baseURL: 'http://testdrive-fca.mybluemix.net',
});

export const serverApi = axios.create({
  baseURL: 'http://localhost:3333',
});
