import { io } from 'socket.io-client';
import CONSTANTS from '../constants';
import { addMessage, addMessageError } from '../redux/slices/messageSlice';
import store from '../redux';

const {
  WS_SERVER_URL,
  SOCKET_EVENTS: { NEW_MESSAGE, NEW_MESSAGE_ERROR },
} = CONSTANTS;

const socket = io(WS_SERVER_URL, { transports: ['websocket'] });

export const sendMessage = (message) => socket.emit(NEW_MESSAGE, message);

socket.on(NEW_MESSAGE, (message) => {
  store.dispatch(addMessage(message));
});

socket.on(NEW_MESSAGE_ERROR, (error) => {
  store.dispatch(addMessageError(error));
});
