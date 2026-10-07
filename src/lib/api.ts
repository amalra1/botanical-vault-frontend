import axios from 'axios';
import { API_URL } from '@/constants/env';
import { readAuthToken } from './authToken';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = readAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
