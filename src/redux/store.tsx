import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dashboardSlice from './dashboard';
import pasteSlice from './pasteSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    paste: pasteSlice,
    dashboard: dashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
