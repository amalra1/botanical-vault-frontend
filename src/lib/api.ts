import axios, { isAxiosError } from 'axios';
import { API_PATHS } from '@/constants/apiPaths';
import { API_URL } from '@/constants/env';
import { HTTP_STATUS } from '@/constants/httpStatus';
import { ROUTES } from '@/constants/routes';
import { clearAuthToken, readAuthToken } from './authToken';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = readAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isExpiredSession(error)) {
      clearAuthToken();
      window.location.assign(ROUTES.login);
    }
    return Promise.reject(error);
  },
);

function isExpiredSession(error: unknown) {
  return (
    isAxiosError(error) &&
    error.response?.status === HTTP_STATUS.unauthorized &&
    error.config?.url !== API_PATHS.login
  );
}
