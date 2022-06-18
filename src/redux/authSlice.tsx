import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadFromCache, writeToCache} from '../utils/cache';
import {hmacSha256} from '../utils/cipher/hash';
import authJson from '../config/auth.json';

const authKeyName = 'auth_key';

interface AuthState {
  authKey: string,
}

const initialState: AuthState = {
  authKey: loadFromCache(authKeyName) || '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthKey: (state, action: PayloadAction<string>) => {
      // to avoid using plaintext in local storage
      const key = hmacSha256('key-' + authJson.authKeySalt, action.payload);
      state.authKey = key;
      writeToCache(authKeyName, key);
    },
  },
});

export const {setAuthKey} = authSlice.actions;
export default authSlice.reducer;
