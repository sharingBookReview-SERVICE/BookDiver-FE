import axios from 'axios';
import { getToken } from './GetToken';
import { API_ENDPOINTS } from './ApiEndpoint';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  config => {
    const token = getToken();

    config.headers = {
      Authorization: `Bearer ${token ? token : ''}`,
      ...config.headers,
    };

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    return response;
  },
  // eslint-disable-next-line require-await
  async error => {
    if (error.response.status === 401 || error.response.status === 406) {
      // Login 창으로 이동
      window.location.href = API_ENDPOINTS.LOGIN;
    }
    return Promise.reject(error);
  },
);

export default http;
