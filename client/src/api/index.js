import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

export const login = (userData) => httpClient.post('/auth/login', userData);
export const registration = (userData) =>
  httpClient.post('/auth/registration', userData);
export const refresh = (token) => httpClient.post('/auth/refresh', { token });
