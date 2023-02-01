import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

let accessToken = null;

httpClient.interceptors.response.use(
  function (response) {
    if (response?.data?.data?.tokens) {
      // ответ был с токенами
      // localStorage.setItem('token', response.data.data.tokens.refresh);
      localStorage.setItem(
        CONSTANTS.REFRESH_TOKEN,
        response.data.data.tokens.access
      );
      // access в инкапсуляции
      accessToken = response.data.data.tokens.access;
    }

    return response;
  },
  async function (error) {
    // токен протух

    const {
      response: { status },
    } = error;

    const refreshFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (status === 419 && refreshFromLS) {
      const {
        data: {
          data: {
            tokens: { access },
          },
        },
      } = await axios.post(`${CONSTANTS.HTTP_SERVER_URL}/auth/refresh`, {
        token: refreshFromLS,
      });

      // обновляем нашу токены
      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, access);
      accessToken = access;

      // устанавливаю заголовок
      error.config.headers['Authorization'] = `Bearer ${accessToken}`;

      // перезапускаю запрос
      return httpClient.request(error.config);
    }

    return Promise.reject(error);
  }
);

httpClient.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export const login = (userData) => httpClient.post('/auth/login', userData);
export const registration = (userData) =>
  httpClient.post('/auth/registration', userData);
export const refresh = (token) => httpClient.post('/auth/refresh', { token });

export const getMessages = (options) => httpClient.get(`/messages`);
