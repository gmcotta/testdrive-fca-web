import axios from 'axios';

const api = axios.create({
  baseURL: 'http://testdrive-fca.mybluemix.net',
});

export default api;
