import { API_URL, X_API_KEY } from '../constants';
import axios from 'axios';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': X_API_KEY,
  },
});

instance.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};

  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default instance;
