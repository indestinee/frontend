import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const authKeyName = 'auth_key';

export interface AuthState {
  authKey: string,
}

const initialState: AuthState = {
  authKey: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthKey: (state, action: PayloadAction<string>) => {
      state.authKey = action.payload;
    },
  },
});

export const {setAuthKey} = authSlice.actions;
export default authSlice.reducer;
