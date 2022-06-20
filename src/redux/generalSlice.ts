import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {sha256} from '../utils/cipher/hash';

const messageDelay = 3000;
const maxMessages = 3;

export interface Message {
  content: string,
  level: 'primary' | 'secondary' | 'success' |
      'danger' | 'warning' | 'info' | 'light' | 'dark',
}

export interface MessageInfo {
  expire: number,
  hash: string,
  message: Message,
}

interface GeneralState {
  messageInfos: MessageInfo[],
}

const initialState: GeneralState = {
  messageInfos: [],
};

export const generalSlice = createSlice({
  name: 'dashbaord',
  initialState,
  reducers: {
    appendMessage: (state, action: PayloadAction<Message>) => {
      const expire = Date.now() + messageDelay;
      state.messageInfos.push({
        message: action.payload,
        expire,
        hash: sha256(action.payload.content + action.payload.level + expire),
      });
      state.messageInfos = state.messageInfos.slice(-maxMessages);
      console.log(
        `[${action.payload.level.toUpperCase()}] ${action.payload.content}`);
    },
    setMessage: (state, action: PayloadAction<MessageInfo[]>) => {
      state.messageInfos = action.payload;
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messageInfos = state.messageInfos.filter(
        (messageInfo) => messageInfo.hash != action.payload,
      );
    },
    expireMessage: (state) => {
      const ts = Date.now();
      state.messageInfos = state.messageInfos.filter(
        (messageInfo) => messageInfo.expire > ts,
      );
    },
  },
});

export const {
  appendMessage,
  setMessage,
  deleteMessage,
  expireMessage,
} = generalSlice.actions;
export default generalSlice.reducer;
