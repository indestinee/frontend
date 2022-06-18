import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadFromCache, writeToCache} from '../utils/cache';
import {hmacSha256} from '../utils/cipher/hash';


const authKeyName = 'auth_key';

interface AuthState {
  authKey: string,
}

const initialState: AuthState = {
  authKey: loadFromCache(authKeyName) || ' ',
};

const authKeyMessage = 'key-a961012529a62a0ecb69bae6e7a7ba67';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthKey: (state, action: PayloadAction<string>) => {
      const key = hmacSha256(authKeyMessage, action.payload);
      state.authKey = key;
      writeToCache(authKeyName, key);
    },
  },
});

export const {setAuthKey} = authSlice.actions;
export default authSlice.reducer;
