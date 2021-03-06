import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-vuello.phake.dev/api',
});

export default instance;
